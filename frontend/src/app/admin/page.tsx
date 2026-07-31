'use client';

import * as React from 'react';

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-display font-bold mb-8">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-panel p-6 rounded-lg border border-hairline">
          <h3 className="text-sm font-mono text-muted uppercase mb-2">Projects</h3>
          <p className="text-3xl font-bold text-signal">Manage</p>
        </div>
        <div className="bg-panel p-6 rounded-lg border border-hairline">
          <h3 className="text-sm font-mono text-muted uppercase mb-2">Experience</h3>
          <p className="text-3xl font-bold text-signal">Manage</p>
        </div>
        <div className="bg-panel p-6 rounded-lg border border-hairline">
          <h3 className="text-sm font-mono text-muted uppercase mb-2">Messages</h3>
          <p className="text-3xl font-bold text-signal">View</p>
        </div>
      </div>
    </div>
  );
}
