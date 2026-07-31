import { LayoutDashboard, FolderGit2, Code2, Briefcase, GraduationCap, Award, MessageSquare, User } from 'lucide-react';

export const ADMIN_NAV_ITEMS = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Profile', href: '/admin/profile', icon: User },
  { name: 'Projects', href: '/admin/projects', icon: FolderGit2 },
  { name: 'Skills', href: '/admin/skills', icon: Code2 },
  { name: 'Experience', href: '/admin/experience', icon: Briefcase },
  { name: 'Education', href: '/admin/education', icon: GraduationCap },
  { name: 'Certifications', href: '/admin/certifications', icon: Award },
  { name: 'Messages', href: '/admin/messages', icon: MessageSquare },
];
