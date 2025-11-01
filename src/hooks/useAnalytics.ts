import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { analyticsService } from '@/services/analyticsService';

export const analyticsKeys = {
  all: ['analytics'] as const,
  views: () => [...analyticsKeys.all, 'views'] as const,
};

export function useViewStats() {
  return useQuery({
    queryKey: analyticsKeys.views(),
    queryFn: () => analyticsService.getViews(),
    refetchInterval: 60000, // Refetch every minute
    staleTime: 30000, // Consider data stale after 30 seconds
  });
}

export function useRecordView() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => analyticsService.recordView(),
    onSuccess: (data) => {
      queryClient.setQueryData(analyticsKeys.views(), data);
    },
  });
}
