import { apiClient } from './apiClient';
import type { ContactFormData, ApiResponse } from '@/types';

export const contactService = {
  submit: async (data: ContactFormData): Promise<ApiResponse> => {
    return apiClient.post<ApiResponse>('/contact', data);
  },
};
