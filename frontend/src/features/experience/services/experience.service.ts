import { api } from '../../../lib/api';
import { Experience } from '../../../types/experience';

export const experienceService = {
  getAll: async (): Promise<Experience[]> => {
    return api.get('/experience');
  },
  
  create: async (data: Partial<Experience>): Promise<Experience> => {
    return api.post('/experience', data);
  },
  
  update: async (id: string, data: Partial<Experience>): Promise<Experience> => {
    return api.patch(`/experience/${id}`, data);
  },
  
  delete: async (id: string): Promise<void> => {
    return api.delete(`/experience/${id}`);
  }
};
