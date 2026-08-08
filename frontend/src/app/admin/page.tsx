'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import { dashboardService, DashboardStats } from '../../features/dashboard/services/dashboard.service';
import { StatCard } from '../../features/dashboard/components/StatCard';
import { FolderGit2, Code2, MessageSquare, Cpu } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      const data = await dashboardService.getStats();
      setStats(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load dashboard stats');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div>
        <h1 className="text-3xl font-display font-bold mb-8">Dashboard Overview</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-panel h-32 rounded-lg border border-hairline animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-alert/10 border border-alert/20 text-alert rounded font-mono">
        {error}
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-display font-bold mb-8">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Projects"
          value={stats?.projects || 0}
          icon={FolderGit2}
        />
        <StatCard
          title="Skills & Tech"
          value={(stats?.skills || 0) + (stats?.technologies || 0)}
          icon={Code2}
        />
        <StatCard
          title="New Messages"
          value={stats?.unreadMessages || 0}
          icon={MessageSquare}
          trend={stats?.unreadMessages ? 'Requires attention' : undefined}
          trendUp={false}
        />
        <StatCard
          title="Total Messages"
          value={stats?.messages || 0}
          icon={MessageSquare}
        />
      </div>
    </div>
  );
}
