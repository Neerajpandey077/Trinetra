import { api } from './api';

export const projectService = {
  getAllProjects: async () => api.get('/projects'),
  getProjectById: async (id) => api.get(`/projects/${id}`),
};
