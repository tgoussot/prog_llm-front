export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const ENDPOINTS = {
  LANGUAGES: `${API_URL}/api/languages/`,
  SEARCH_LANGUAGES: `${API_URL}/api/languages/search`,
  LANGUAGE_TESTS: `${API_URL}/api/tests/`,
};

export const FLAG_CDN_URL = 'https://flagcdn.com'; 