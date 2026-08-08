import { api } from '../../../lib/api';
import { Skill } from '../../../types/skill';

export const skillService = {
  getAll: async (): Promise<Skill[]> => {
    return api.get('/skills');
  },
  
  create: async (data: Partial<Skill>): Promise<Skill> => {
    return api.post('/skills', data);
  },
  
  update: async (id: string, data: Partial<Skill>): Promise<Skill> => {
    return api.patch(`/skills/${id}`, data);
  },
  
  delete: async (id: string): Promise<void> => {
    return api.delete(`/skills/${id}`);
  }
};
