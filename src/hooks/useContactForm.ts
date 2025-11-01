import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactService } from '@/services';
import { useUIStore } from '@/store';
import { contactFormSchema, type ContactFormInput } from '@/validations';

export function useContactForm() {
  const addNotification = useUIStore((state) => state.addNotification);

  const form = useForm<ContactFormInput>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const mutation = useMutation({
    mutationFn: (data: ContactFormInput) => contactService.submit(data),
    onSuccess: () => {
      addNotification({
        type: 'success',
        message: 'Message sent successfully!',
        duration: 5000,
      });
      form.reset();
    },
    onError: (error) => {
      addNotification({
        type: 'error',
        message: error instanceof Error ? error.message : 'Failed to send message',
        duration: 5000,
      });
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    mutation.mutate(data);
  });

  return {
    form,
    onSubmit,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
  };
}
