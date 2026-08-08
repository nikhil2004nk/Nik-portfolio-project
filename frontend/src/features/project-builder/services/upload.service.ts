import { api } from '../../../lib/api';

export const uploadService = {
  uploadProjectImage: async (slug: string, file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    
    // api.ts uses axios under the hood. Axios automatically sets the correct Content-Type with boundaries when passing FormData.
    const response = await api.post<any, { url: string }>(`/upload/projects/${slug}/image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    return response.url;
  }
};
