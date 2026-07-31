import { api } from '../../../lib/api';
import { Education } from '../../../types/experience';

export const educationService = {
  getAll: async (): Promise<Education[]> => {
    return api.get('/education');
  },
  
  create: async (data: Partial<Education>): Promise<Education> => {
    return api.post('/education', data);
  },
  
  update: async (id: string, data: Partial<Education>): Promise<Education> => {
    return api.patch(`/education/${id}`, data);
  },
  
  delete: async (id: string): Promise<void> => {
    return api.delete(`/education/${id}`);
  }
};
