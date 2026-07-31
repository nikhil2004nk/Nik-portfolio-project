import * as React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
}

export function StatCard({ title, value, icon: Icon, trend, trendUp }: StatCardProps) {
  return (
    <div className="bg-panel p-6 rounded-lg border border-hairline hover:border-signal/50 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-sm font-mono text-muted uppercase tracking-wider">{title}</h3>
        <div className="p-2 bg-ink rounded-md">
          <Icon className="w-5 h-5 text-signal" />
        </div>
      </div>
      <div className="flex items-end justify-between">
        <p className="text-3xl font-display font-bold text-primary">{value}</p>
        {trend && (
          <p className={`text-sm font-mono ${trendUp ? 'text-ledger' : 'text-alert'}`}>
            {trendUp ? '↑' : '↓'} {trend}
          </p>
        )}
      </div>
    </div>
  );
}
