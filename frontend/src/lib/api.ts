const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    next: { revalidate: 60 },
    ...options,
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch ${endpoint}`);
  }

  return res.json();
}

export const api = {
  getProjects: () => fetchAPI('/projects'),
  getSkills: () => fetchAPI('/skills'),
  getExperience: () => fetchAPI('/experience'),
  getEducation: () => fetchAPI('/education'),
  getCertifications: () => fetchAPI('/certifications'),
  submitContact: (data: any) => fetchAPI('/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }),
};
