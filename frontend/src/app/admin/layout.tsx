'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { adminApi } from '../../lib/admin-api';
import { LayoutDashboard, LogOut, FolderGit2, Code2, Briefcase, GraduationCap, Award, MessageSquare } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === '/admin/login') {
    return <div className="min-h-screen bg-ink">{children}</div>;
  }

  const handleLogout = async () => {
    try {
      await adminApi.logout();
      router.push('/admin/login');
    } catch (e) {
      console.error(e);
    }
  };

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Projects', href: '/admin/projects', icon: FolderGit2 },
    { name: 'Skills', href: '/admin/skills', icon: Code2 },
    { name: 'Experience', href: '/admin/experience', icon: Briefcase },
    { name: 'Education', href: '/admin/education', icon: GraduationCap },
    { name: 'Certifications', href: '/admin/certifications', icon: Award },
    { name: 'Messages', href: '/admin/messages', icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-ink text-primary flex">
      {/* Sidebar */}
      <aside className="w-64 bg-panel border-r border-hairline flex flex-col hidden md:flex">
        <div className="p-6 border-b border-hairline">
          <h2 className="text-xl font-display font-bold text-signal">Admin Panel</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
                  isActive ? 'bg-signal/10 text-signal' : 'text-muted hover:bg-hairline hover:text-primary'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-mono text-sm">{item.name}</span>
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-hairline">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-md text-alert hover:bg-alert/10 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-mono text-sm">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
