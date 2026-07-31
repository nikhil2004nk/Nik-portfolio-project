import { api } from '../../../lib/api';

export const authService = {
  login: async (data: { email: string; password: string }) => {
    return api.post('/auth/login', data);
  },

  logout: async () => {
    return api.post('/auth/logout');
  },
};
