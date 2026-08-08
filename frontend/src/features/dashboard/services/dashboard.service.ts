import { api } from '../../../lib/api';

export interface DashboardStats {
  projects: number;
  skills: number;
  messages: number;
  unreadMessages: number;
  technologies: number;
}

export const dashboardService = {
  getStats: async (): Promise<DashboardStats> => {
    return api.get('/dashboard/stats');
  },
};
