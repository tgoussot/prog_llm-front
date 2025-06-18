import axios from 'axios';
import { ENDPOINTS } from '../constants/api';

export const fetchSavedLanguages = async () => {
  try {
    const response = await axios.get(ENDPOINTS.LANGUAGES);
    return response.data;
  } catch (error) {
    console.error('Erreur lors du chargement des langues:', error);
    throw error;
  }
};

export const searchLanguages = async (query, lang = 'fr') => {
  try {
    const response = await axios.get(ENDPOINTS.SEARCH_LANGUAGES, {
      params: { query, lang }
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la recherche des langues:', error);
    throw error;
  }
};

export const saveLanguage = async (language) => {
  try {
    const languageData = {
      name: language.name,
      country_code: language.country_code || '',
      country_name: language.country_name || ''
    };
    
    const response = await axios.post(ENDPOINTS.LANGUAGES, languageData);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de l\'ajout de la langue:', error);
    throw error;
  }
}; 