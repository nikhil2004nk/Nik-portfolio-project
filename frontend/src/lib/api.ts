import axios, { AxiosError } from 'axios';

export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Crucial for sending/receiving HTTP-only cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor to unwrap our standard backend response: { success, message, data, meta }
api.interceptors.response.use(
  (response) => {
    // If the response follows our standard structure, return just the data
    if (response.data && response.data.success !== undefined && response.data.data !== undefined) {
      return response.data.data;
    }
    return response.data;
  },
  (error: AxiosError) => {
    // Handle error formatting from backend
    let errorMessage = 'An unexpected error occurred';
    
    if (error.response?.data) {
      const data = error.response.data as any;
      errorMessage = data.message || data.error || errorMessage;
    } else if (error.message) {
      errorMessage = error.message;
    }

    return Promise.reject(new Error(errorMessage));
  }
);
