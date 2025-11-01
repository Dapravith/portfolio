import { z } from 'zod';

export const projectSchema = z.object({
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must be less than 100 characters'),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must be less than 500 characters'),
  technologies: z
    .array(z.string())
    .min(1, 'At least one technology is required'),
  github: z
    .string()
    .url('Invalid GitHub URL')
    .optional()
    .or(z.literal('')),
  demo: z
    .string()
    .url('Invalid demo URL')
    .optional()
    .or(z.literal('')),
  image: z
    .string()
    .url('Invalid image URL')
    .optional(),
  featured: z
    .boolean()
    .default(false),
});

export type ProjectFormInput = z.infer<typeof projectSchema>;
