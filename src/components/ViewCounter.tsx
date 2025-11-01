'use client';

import { useEffect } from 'react';
import { Eye, Users, TrendingUp } from 'lucide-react';
import { useViewStats, useRecordView } from '@/hooks/useAnalytics';
import { Card } from '@/components/ui/card';

export function ViewCounter() {
  const { data: stats, isLoading } = useViewStats();
  const { mutate: recordView } = useRecordView();

  // Record view on component mount
  useEffect(() => {
    recordView();
  }, [recordView]);

  if (isLoading || !stats) {
    return (
      <div className="flex items-center gap-4 text-sm text-muted-foreground animate-pulse">
        <div className="h-4 w-24 bg-muted rounded"></div>
        <div className="h-4 w-24 bg-muted rounded"></div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-6 text-sm">
      <div className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
        <Eye className="h-4 w-4" />
        <span className="font-medium">{stats.totalViews.toLocaleString()}</span>
        <span className="hidden sm:inline">total views</span>
      </div>
      
      <div className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
        <Users className="h-4 w-4" />
        <span className="font-medium">{stats.uniqueVisitors.toLocaleString()}</span>
        <span className="hidden sm:inline">visitors</span>
      </div>
      
      <div className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
        <TrendingUp className="h-4 w-4" />
        <span className="font-medium">{stats.todayViews.toLocaleString()}</span>
        <span className="hidden sm:inline">today</span>
      </div>
    </div>
  );
}

// Compact version for mobile
export function ViewCounterCompact() {
  const { data: stats, isLoading } = useViewStats();
  const { mutate: recordView } = useRecordView();

  useEffect(() => {
    recordView();
  }, [recordView]);

  if (isLoading || !stats) {
    return (
      <div className="h-4 w-20 bg-muted rounded animate-pulse"></div>
    );
  }

  return (
    <div className="flex items-center gap-2 text-xs text-muted-foreground">
      <Eye className="h-3 w-3" />
      <span>{stats.totalViews.toLocaleString()} views</span>
    </div>
  );
}

// Card version for dashboard
export function ViewStatsCard() {
  const { data: stats, isLoading } = useViewStats();

  if (isLoading || !stats) {
    return (
      <Card className="p-6">
        <div className="space-y-4 animate-pulse">
          <div className="h-4 w-32 bg-muted rounded"></div>
          <div className="h-8 w-24 bg-muted rounded"></div>
        </div>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="p-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-500/10 rounded-lg">
            <Eye className="h-6 w-6 text-blue-500" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Views</p>
            <p className="text-2xl font-bold">{stats.totalViews.toLocaleString()}</p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-green-500/10 rounded-lg">
            <Users className="h-6 w-6 text-green-500" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Unique Visitors</p>
            <p className="text-2xl font-bold">{stats.uniqueVisitors.toLocaleString()}</p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-purple-500/10 rounded-lg">
            <TrendingUp className="h-6 w-6 text-purple-500" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Today&apos;s Views</p>
            <p className="text-2xl font-bold">{stats.todayViews.toLocaleString()}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
