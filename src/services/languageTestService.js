import axios from 'axios';
import { ENDPOINTS } from '../constants/api';

export const generateLanguageTest = async (languageName, targetLevel = null) => {
  try {
    const requestData = {
      langue: languageName,
      niveau_cible: targetLevel
    };
    
    const response = await axios.post(ENDPOINTS.LANGUAGE_TESTS, requestData);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la génération du test:', error);
    throw error;
  }
};

export const checkTestImports = async () => {
  try {
    const response = await axios.get(`${ENDPOINTS.LANGUAGE_TESTS}import-check`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la vérification des imports:', error);
    throw error;
  }
}; 