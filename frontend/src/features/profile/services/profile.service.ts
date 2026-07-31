import { api } from '../../../lib/api';
import { Profile } from '../../../types/profile';

export const profileService = {
  getProfile: async (): Promise<Profile> => {
    return api.get('/profile');
  },
  
  updateProfile: async (id: string, data: Partial<Profile>): Promise<Profile> => {
    return api.patch(`/profile/${id}`, data);
  }
};
