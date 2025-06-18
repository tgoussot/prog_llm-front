import React from 'react';
import { Card, Typography, Space, Tag, Radio } from 'antd';
import { BookOutlined } from '@ant-design/icons';
import { TEST_COLORS, EXERCISE_CARD_STYLES } from '../../styles/testColors';

const { Title, Text } = Typography;

const VocabulaireExercice = ({ exercise, response, onResponseChange, exerciseNumber }) => {
  // Gérer les réponses aux éléments QCM
  const handleResponseChange = (elementId, value) => {
    const newResponse = {
      ...response,
      [elementId]: value
    };
    onResponseChange(newResponse);
  };

  // Extraire les données de l'exercice
  const { consigne, contenu, competence } = exercise;
  const { elements } = contenu || {};

  return (
    <Space direction="vertical" style={{ width: '100%' }} size="large">
      {/* En-tête de l'exercice */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          backgroundColor: TEST_COLORS.vocabulaire.background,
          padding: '8px',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <BookOutlined style={{ fontSize: '20px', color: TEST_COLORS.vocabulaire.text }} />
        </div>
        <div>
          <Title level={4} style={{ margin: 0, color: TEST_COLORS.vocabulaire.text }}>
            Exercice {exerciseNumber} - Vocabulaire
          </Title>
          {competence && (
            <Tag color={TEST_COLORS.vocabulaire.tag} style={{ marginTop: '4px' }}>
              {competence}
            </Tag>
          )}
        </div>
      </div>

      {/* Consigne */}
      <Card 
        size="small" 
        style={{ 
          backgroundColor: TEST_COLORS.vocabulaire.background,
          border: `1px solid ${TEST_COLORS.vocabulaire.border}`,
          borderRadius: '8px'
        }}
      >
        <Text strong style={{ color: TEST_COLORS.vocabulaire.text }}>
          📚 Consigne : {consigne}
        </Text>
      </Card>

      {/* Éléments de vocabulaire QCM */}
      {elements && elements.length > 0 && (
        <Card 
          title={
            <span style={{ color: TEST_COLORS.vocabulaire.text }}>
              💭 Questions de vocabulaire
            </span>
          }
          style={{ 
            backgroundColor: TEST_COLORS.neutral.backgroundLight,
            border: `1px solid ${TEST_COLORS.vocabulaire.border}`,
            borderRadius: '8px'
          }}
          headStyle={{ 
            backgroundColor: TEST_COLORS.vocabulaire.background,
            borderBottom: `1px solid ${TEST_COLORS.vocabulaire.border}`
          }}
        >
          <Space direction="vertical" style={{ width: '100%' }} size="large">
            {elements.map((element, index) => (
              <div key={element.id || index} style={{ marginBottom: '24px' }}>
                <Text strong style={{ 
                  display: 'block', 
                  marginBottom: '12px',
                  color: TEST_COLORS.neutral.text,
                  fontSize: '16px'
                }}>
                  {index + 1}. {element.texte}
                </Text>
                
                {/* Options QCM */}
                {element.options && element.options.length > 0 ? (
                  <Radio.Group
                    value={response[element.id] || ''}
                    onChange={(e) => handleResponseChange(element.id, e.target.value)}
                    style={{ width: '100%' }}
                  >
                    <Space direction="vertical" style={{ width: '100%' }} size="small">
                      {element.options.map((option) => (
                        <Radio 
                          key={option.id} 
                          value={option.id}
                          style={{
                            padding: '8px 12px',
                            borderRadius: '6px',
                            border: `1px solid ${TEST_COLORS.neutral.border}`,
                            backgroundColor: response[element.id] === option.id 
                              ? TEST_COLORS.vocabulaire.background 
                              : 'white',
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center'
                          }}
                        >
                          <span style={{ marginLeft: '8px' }}>
                            <strong>{option.id}.</strong> {option.texte}
                          </span>
                        </Radio>
                      ))}
                    </Space>
                  </Radio.Group>
                ) : (
                  <Text type="secondary" italic>
                    Aucune option disponible pour cette question
                  </Text>
                )}
              </div>
            ))}
          </Space>
        </Card>
      )}

      {/* Indicateur de progression */}
      <div style={{ textAlign: 'center', padding: '16px' }}>
        <Text type="secondary">
          Sélectionnez la bonne réponse pour chaque question puis passez à la suite
        </Text>
      </div>
    </Space>
  );
};

export default VocabulaireExercice; 