import React, { useState } from 'react';
import { Card, message, Spin } from 'antd';
import { FLAG_CDN_URL } from '../constants/api';
import { CARD_STYLES, CARD_BODY_STYLES } from '../styles/common';
import { generateLanguageTest } from '../services/languageTestService';
import { useLoading } from '../contexts/LoadingContext';

const LanguageCard = ({ language, onTestGenerated }) => {
  const { showLoading, hideLoading } = useLoading();

  const getLanguageTypeLabel = (type) => {
    switch(type) {
      case 'L': return 'Langue vivante';
      case 'E': return 'Langue éteinte';
      case 'C': return 'Langue construite';
      case 'A': return 'Ancienne langue';
      case 'S': return 'Langue spéciale';
      default: return type;
    }
  };

  const handleCardClick = async () => {
    showLoading(`Génération du test de ${language.name}...`);
    try {
      const test = await generateLanguageTest(language.name);
      message.success(`Test de ${language.name} généré avec succès !`);
      
      // Appeler la fonction de callback si elle existe
      if (onTestGenerated) {
        onTestGenerated(test, language);
      }
    } catch (error) {
      message.error(`Erreur lors de la génération du test de ${language.name}`);
      console.error('Erreur:', error);
    } finally {
      hideLoading();
    }
  };

  return (
    <Card
      hoverable
      style={{
        ...CARD_STYLES,
        cursor: 'pointer'
      }}
      bodyStyle={CARD_BODY_STYLES}
      onClick={handleCardClick}
    >
      {language.country_code && (
        <img 
          src={`${FLAG_CDN_URL}/h80/${language.country_code.toLowerCase()}.png`}
          alt={language.country_name || language.name}
          style={{ width: 'auto', height: 80, objectFit: 'cover', marginBottom: 12 }}
        />
      )}
      <div style={{ fontSize: 24, marginBottom: 8 }}>
        {language.alpha_2 ? language.alpha_2.toUpperCase() : language.code}
      </div>
      <div style={{ fontWeight: 'bold', marginTop: 12, fontSize: 18 }}>
        {language.name}
      </div>
    </Card>
  );
};

export default LanguageCard; 