import React, { useState, useEffect } from 'react';
import { Typography, Row, Col, Space, message, Modal } from 'antd';
import { fetchSavedLanguages } from '../services/languageService';
import LanguageCard from './LanguageCard';
import LanguageSearch from './LanguageSearch';
import TestInterface from './TestInterface';
import { useLoading } from '../contexts/LoadingContext';
import { CONTAINER_STYLES, HEADER_STYLES, TITLE_STYLES } from '../styles/common';

const ChoixLangue = () => {
  const [savedLanguages, setSavedLanguages] = useState([]);
  const [currentTest, setCurrentTest] = useState(null);
  const [testModalVisible, setTestModalVisible] = useState(false);
  const { showLoading, hideLoading } = useLoading();

  const loadSavedLanguages = async () => {
    showLoading('Chargement de vos langues...');
    try {
      const languages = await fetchSavedLanguages();
      console.log(languages);
      setSavedLanguages(languages);
    } catch (error) {
      message.error('Erreur lors du chargement des langues');
    } finally {
      hideLoading();
    }
  };

  const handleTestGenerated = (test, language) => {
    // Fermer le modal existant s'il est ouvert pour éviter tout conflit
    if (testModalVisible) {
      setTestModalVisible(false);
      setCurrentTest(null);
      
      // Petit délai pour laisser le modal se fermer proprement
      setTimeout(() => {
        setCurrentTest({ test, language });
        setTestModalVisible(true);
      }, 100);
    } else {
      setCurrentTest({ test, language });
      setTestModalVisible(true);
    }
  };

  const handleTestSubmit = (responses) => {
    console.log('Réponses du test:', responses);
    message.success('Test soumis avec succès ! La correction sera bientôt disponible.');
    setTestModalVisible(false);
    setCurrentTest(null);
    // TODO: Envoyer les réponses au backend pour correction
  };

  const handleTestClose = () => {
    setTestModalVisible(false);
    setCurrentTest(null);
  };

  useEffect(() => {
    loadSavedLanguages();
  }, []);

  return (
    <div style={CONTAINER_STYLES}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div style={HEADER_STYLES}>
          <Typography.Title style={TITLE_STYLES}>
            Choisis une langue
          </Typography.Title>
        </div>

        <Row gutter={[32, 32]} justify="center" style={{ width: '100%' }}>
          {savedLanguages.map((language) => (
            <Col xs={24} sm={12} md={8} lg={5} xl={4} key={language.id}>
              <LanguageCard 
                language={language} 
                onTestGenerated={handleTestGenerated}
              />
            </Col>
          ))}
        </Row>

        <LanguageSearch onLanguageAdded={loadSavedLanguages} />
      </Space>

      {/* Modal pour le test interactif */}
      <Modal
        title={null}
        open={testModalVisible}
        onCancel={handleTestClose}
        footer={null}
        width="95vw"
        style={{ top: 20 }}
        bodyStyle={{ padding: '24px' }}
      >
        {currentTest && (
          <TestInterface
            test={currentTest.test}
            language={currentTest.language}
            onSubmit={handleTestSubmit}
            onClose={handleTestClose}
          />
        )}
      </Modal>
    </div>
  );
};

export default ChoixLangue; 