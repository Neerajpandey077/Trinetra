const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const API_KEY = import.meta.env.VITE_API_KEY || '';

function buildHeaders(extraHeaders = {}) {
  const headers = {
    ...extraHeaders,
    'Content-Type': 'application/json',
  };

  if (API_KEY) {
    headers['X-API-Key'] = API_KEY;
    headers.Authorization = `Bearer ${API_KEY}`;
  }

  return headers;
}

export const api = {
  get: async (endpoint) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: buildHeaders(),
    });
    return response.json();
  },

  post: async (endpoint, data) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: buildHeaders(),
      body: JSON.stringify(data),
    });
    return response.json();
  },
};
