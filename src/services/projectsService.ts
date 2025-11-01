import { apiClient } from './apiClient';
import type { Project, ApiResponse } from '@/types';

export const projectsService = {
  getAll: async (): Promise<Project[]> => {
    return apiClient.get<Project[]>('/projects');
  },

  getById: async (id: number): Promise<Project> => {
    return apiClient.get<Project>(`/projects/${id}`);
  },

  getFeatured: async (): Promise<Project[]> => {
    return apiClient.get<Project[]>('/projects?featured=true');
  },

  create: async (data: Omit<Project, 'id'>): Promise<Project> => {
    return apiClient.post<Project>('/projects', data);
  },

  update: async (id: number, data: Partial<Project>): Promise<Project> => {
    return apiClient.put<Project>(`/projects/${id}`, data);
  },

  delete: async (id: number): Promise<void> => {
    return apiClient.delete<void>(`/projects/${id}`);
  },
};
