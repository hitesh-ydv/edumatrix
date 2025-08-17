import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Your backend API URL

const api = axios.create({
  baseURL: API_URL,
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const examApi = {
  getAll: () => api.get('/exams'),
  getById: (id) => api.get(`/exams/${id}`),
  create: (data) => api.post('/exams', data),
  update: (id, data) => api.put(`/exams/${id}`, data),
  delete: (id) => api.delete(`/exams/${id}`),
};

export const internshipApi = {
  getAll: () => api.get('/internships'),
  getById: (id) => api.get(`/internships/${id}`),
  create: (data) => api.post('/internships', data),
  update: (id, data) => api.put(`/internships/${id}`, data),
  delete: (id) => api.delete(`/internships/${id}`),
};

export const noteApi = {
  getAll: () => api.get('/notes'),
  getById: (id) => api.get(`/notes/${id}`),
  create: (data) => api.post('/notes', data),
  update: (id, data) => api.put(`/notes/${id}`, data),
  delete: (id) => api.delete(`/notes/${id}`),
};

export const roadmapApi = {
  getAll: () => api.get('/roadmaps'),
  getById: (id) => api.get(`/roadmaps/${id}`),
  create: (data) => api.post('/roadmaps', data),
  update: (id, data) => api.put(`/roadmaps/${id}`, data),
  delete: (id) => api.delete(`/roadmaps/${id}`),
};

export const syllabusApi = {
  getAll: () => api.get('/syllabus'),
  getById: (id) => api.get(`/syllabus/${id}`),
  create: (data) => api.post('/syllabus', data),
  update: (id, data) => api.put(`/syllabus/${id}`, data),
  delete: (id) => api.delete(`/syllabus/${id}`),
};

export const topResourceApi = {
  getAll: () => api.get('/top-resources'),
  getById: (id) => api.get(`/top-resources/${id}`),
  create: (data) => api.post('/top-resources', data),
  update: (id, data) => api.put(`/top-resources/${id}`, data),
  delete: (id) => api.delete(`/top-resources/${id}`),
};