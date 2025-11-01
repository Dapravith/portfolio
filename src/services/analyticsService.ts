import { apiClient } from './apiClient';

export interface ViewStats {
  totalViews: number;
  uniqueVisitors: number;
  todayViews: number;
}

export const analyticsService = {
  getViews: async (): Promise<ViewStats> => {
    const response = await apiClient.get<{ data: ViewStats }>('/analytics/views');
    return response.data;
  },

  recordView: async (): Promise<ViewStats> => {
    const response = await apiClient.post<{ data: ViewStats }>('/analytics/views');
    return response.data;
  },
};
