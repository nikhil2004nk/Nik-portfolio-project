import { api } from '../../../lib/api';
import { Project } from '../../../types/project';

export const projectService = {
  getAll: async (): Promise<Project[]> => {
    return api.get('/admin/projects');
  },
  
  getById: async (id: string): Promise<Project> => {
    return api.get(`/admin/projects/${id}`);
  },
  
  create: async (data: Partial<Project>): Promise<Project> => {
    return api.post('/admin/projects', data);
  },
  
  update: async (id: string, data: Partial<Project>): Promise<Project> => {
    return api.patch(`/admin/projects/${id}`, data);
  },
  
  delete: async (id: string): Promise<void> => {
    return api.delete(`/admin/projects/${id}`);
  }
};
