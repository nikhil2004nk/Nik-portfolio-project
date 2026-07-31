import { api } from './api';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

// A generic function for admin requests
export const adminApi = {
  login: async (data: any) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      credentials: 'include',
    });
    if (!res.ok) throw new Error('Login failed');
    return res.json();
  },
  
  logout: async () => {
    const res = await fetch(`${API_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    if (!res.ok) throw new Error('Logout failed');
    return res.json();
  },
  
  getProjects: () => api.getProjects(),
  
  createProject: async (data: any) => {
    const res = await fetch(`${API_URL}/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      credentials: 'include',
    });
    if (!res.ok) throw new Error('Failed to create project');
    return res.json();
  },

  updateProject: async (id: string, data: any) => {
    const res = await fetch(`${API_URL}/projects/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      credentials: 'include',
    });
    if (!res.ok) throw new Error('Failed to update project');
    return res.json();
  },

  deleteProject: async (id: string) => {
    const res = await fetch(`${API_URL}/projects/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    if (!res.ok) throw new Error('Failed to delete project');
    return res.json();
  },

  // Skills
  getSkills: () => fetch(`${API_URL}/skills`, { credentials: 'include' }).then(r => r.json()),
  createSkill: (data: any) => fetch(`${API_URL}/skills`, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data), credentials: 'include' }).then(r => r.json()),
  updateSkill: (id: string, data: any) => fetch(`${API_URL}/skills/${id}`, { method: 'PUT', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data), credentials: 'include' }).then(r => r.json()),
  deleteSkill: (id: string) => fetch(`${API_URL}/skills/${id}`, { method: 'DELETE', credentials: 'include' }).then(r => r.json()),

  // Experience
  getExperience: () => fetch(`${API_URL}/experience`, { credentials: 'include' }).then(r => r.json()),
  createExperience: (data: any) => fetch(`${API_URL}/experience`, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data), credentials: 'include' }).then(r => r.json()),
  updateExperience: (id: string, data: any) => fetch(`${API_URL}/experience/${id}`, { method: 'PUT', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data), credentials: 'include' }).then(r => r.json()),
  deleteExperience: (id: string) => fetch(`${API_URL}/experience/${id}`, { method: 'DELETE', credentials: 'include' }).then(r => r.json()),

  // Education
  getEducation: () => fetch(`${API_URL}/education`, { credentials: 'include' }).then(r => r.json()),
  createEducation: (data: any) => fetch(`${API_URL}/education`, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data), credentials: 'include' }).then(r => r.json()),
  updateEducation: (id: string, data: any) => fetch(`${API_URL}/education/${id}`, { method: 'PUT', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data), credentials: 'include' }).then(r => r.json()),
  deleteEducation: (id: string) => fetch(`${API_URL}/education/${id}`, { method: 'DELETE', credentials: 'include' }).then(r => r.json()),

  // Certifications
  getCertifications: () => fetch(`${API_URL}/certifications`, { credentials: 'include' }).then(r => r.json()),
  createCertification: (data: any) => fetch(`${API_URL}/certifications`, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data), credentials: 'include' }).then(r => r.json()),
  updateCertification: (id: string, data: any) => fetch(`${API_URL}/certifications/${id}`, { method: 'PUT', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data), credentials: 'include' }).then(r => r.json()),
  deleteCertification: (id: string) => fetch(`${API_URL}/certifications/${id}`, { method: 'DELETE', credentials: 'include' }).then(r => r.json()),

  // Messages (Contact)
  getMessages: () => fetch(`${API_URL}/contact`, { credentials: 'include' }).then(r => r.json()),
  deleteMessage: (id: string) => fetch(`${API_URL}/contact/${id}`, { method: 'DELETE', credentials: 'include' }).then(r => r.json()),
};
