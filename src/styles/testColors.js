// Palette de couleurs pour l'interface de test
export const TEST_COLORS = {
  // Couleurs principales
  primary: '#1890ff',
  primaryLight: '#40a9ff',
  primaryDark: '#096dd9',
  
  // Couleurs de succès
  success: '#52c41a',
  successLight: '#73d13d',
  successDark: '#389e0d',
  
  // Couleurs d'accent pour chaque type d'exercice
  comprehension: {
    main: '#1890ff',
    light: '#e6f7ff',
    border: '#91d5ff',
    text: '#0050b3'
  },
  
  grammaire: {
    main: '#52c41a',
    light: '#f6ffed',
    border: '#b7eb8f',
    text: '#389e0d'
  },
  
  vocabulaire: {
    main: '#fa8c16',
    light: '#fff7e6',
    border: '#ffd591',
    text: '#d46b08'
  },
  
  // Couleurs neutres
  neutral: {
    background: '#fafafa',
    backgroundLight: '#ffffff',
    backgroundDark: '#f5f5f5',
    border: '#d9d9d9',
    borderLight: '#e8e8e8',
    text: '#262626',
    textSecondary: '#8c8c8c',
    textLight: '#bfbfbf'
  },
  
  // Couleurs de progression
  progress: {
    gradient: {
      '0%': '#1890ff',
      '100%': '#52c41a'
    },
    background: '#f0f0f0'
  },
  
  // Couleurs d'état
  completed: '#52c41a',
  warning: '#faad14',
  error: '#ff4d4f'
};

// Styles communs pour les cartes d'exercices
export const EXERCISE_CARD_STYLES = {
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
  transition: 'all 0.3s ease'
};

// Styles pour les en-têtes d'exercices
export const EXERCISE_HEADER_STYLES = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  marginBottom: '16px'
};

// Styles pour les consignes
export const CONSIGNE_STYLES = {
  borderRadius: '6px',
  padding: '12px 16px',
  fontWeight: '500'
};

// Styles pour les zones de réponse
export const RESPONSE_AREA_STYLES = {
  borderRadius: '6px',
  border: '1px solid',
  padding: '16px',
  marginTop: '12px',
  transition: 'border-color 0.3s ease'
}; 