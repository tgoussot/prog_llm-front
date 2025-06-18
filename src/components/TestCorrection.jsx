import React from 'react';
import { Card, Typography, Space, Button, Divider, Tag, Progress } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, TrophyOutlined, BookOutlined, EditOutlined } from '@ant-design/icons';
import { TEST_COLORS } from '../styles/testColors';

const { Title, Text, Paragraph } = Typography;

const TestCorrection = ({ test, responses, sectionsToUse, onClose, language }) => {
  
  // Calculer le score total
  const calculateScore = () => {
    let totalQuestions = 0;
    let correctAnswers = 0;
    const detailedResults = [];

    sectionsToUse.forEach((section, sectionIndex) => {
      const sectionResults = {
        sectionName: section.title,
        color: section.color,
        exercises: []
      };

      section.exercises.forEach((exercise, exerciseIndex) => {
        const exerciseKey = `${section.key}_${exerciseIndex}`;
        const userResponses = responses[exerciseKey] || {};
        
        const exerciseResults = {
          exerciseNumber: exerciseIndex + 1,
          consigne: exercise.consigne,
          competence: exercise.competence,
          texte_principal: exercise.contenu?.texte_principal,
          questions: []
        };

        exercise.contenu?.elements?.forEach((element) => {
          totalQuestions++;
          const userAnswer = userResponses[element.id];
          const correctAnswer = element.reponse_correcte;
          const isCorrect = userAnswer === correctAnswer;
          
          if (isCorrect) correctAnswers++;

          exerciseResults.questions.push({
            id: element.id,
            texte: element.texte,
            options: element.options || [],
            userAnswer,
            correctAnswer,
            isCorrect
          });
        });

        sectionResults.exercises.push(exerciseResults);
      });

      detailedResults.push(sectionResults);
    });

    const scorePercentage = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;

    return {
      totalQuestions,
      correctAnswers,
      scorePercentage,
      detailedResults
    };
  };

  const { totalQuestions, correctAnswers, scorePercentage, detailedResults } = calculateScore();

  // Déterminer le niveau de performance
  const getPerformanceLevel = (score) => {
    if (score >= 90) return { level: 'Excellent', color: '#52c41a', icon: '🏆' };
    if (score >= 75) return { level: 'Très bien', color: '#1890ff', icon: '🌟' };
    if (score >= 60) return { level: 'Bien', color: '#faad14', icon: '👍' };
    if (score >= 40) return { level: 'Passable', color: '#fa8c16', icon: '📚' };
    return { level: 'À améliorer', color: '#f5222d', icon: '💪' };
  };

  const performance = getPerformanceLevel(scorePercentage);

  // Obtenir l'icône de section
  const getSectionIcon = (sectionKey) => {
    switch (sectionKey) {
      case 'comprehension_ecrite': return <BookOutlined />;
      case 'grammaire': return <EditOutlined />;
      case 'vocabulaire': return <BookOutlined />;
      default: return <BookOutlined />;
    }
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      {/* En-tête avec score */}
      <Card style={{ marginBottom: '24px', textAlign: 'center', backgroundColor: TEST_COLORS.neutral.backgroundLight }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div>
            <TrophyOutlined style={{ fontSize: '48px', color: performance.color, marginBottom: '16px' }} />
            <Title level={2} style={{ margin: 0, color: TEST_COLORS.neutral.text }}>
              Correction du test de {test?.langue || language?.name}
            </Title>
          </div>
          
          <div style={{ 
            padding: '20px', 
            backgroundColor: performance.color + '15', 
            borderRadius: '12px',
            border: `2px solid ${performance.color}40`
          }}>
            <Text style={{ fontSize: '24px', fontWeight: 'bold', color: performance.color }}>
              {performance.icon} Score: {correctAnswers}/{totalQuestions} ({scorePercentage}%)
            </Text>
            <br />
            <Text style={{ fontSize: '18px', color: performance.color }}>
              Niveau: {performance.level}
            </Text>
          </div>

          <Progress 
            percent={scorePercentage} 
            strokeColor={performance.color}
            trailColor={TEST_COLORS.neutral.border}
            strokeWidth={12}
            format={(percent) => `${percent}%`}
          />
        </Space>
      </Card>

      {/* Correction détaillée par section */}
      {detailedResults.map((section, sectionIndex) => (
        <Card 
          key={sectionIndex}
          style={{ marginBottom: '24px' }}
          title={
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                backgroundColor: section.color.background,
                padding: '8px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {getSectionIcon(sectionsToUse[sectionIndex]?.key)}
              </div>
              <span style={{ color: section.color.text }}>
                {section.sectionName}
              </span>
            </div>
          }
        >
          {section.exercises.map((exercise, exerciseIndex) => (
            <div key={exerciseIndex} style={{ marginBottom: '32px' }}>
              {/* Info exercice */}
              <div style={{ marginBottom: '16px' }}>
                <Title level={4} style={{ color: TEST_COLORS.neutral.text }}>
                  Exercice {exercise.exerciseNumber}
                </Title>
                <Text style={{ color: TEST_COLORS.neutral.textSecondary }}>
                  {exercise.consigne}
                </Text>
                {exercise.competence && (
                  <Tag color={section.color.tag} style={{ marginLeft: '8px' }}>
                    {exercise.competence}
                  </Tag>
                )}
              </div>

              {/* Texte principal si présent */}
              {exercise.texte_principal && (
                <Card size="small" style={{ marginBottom: '16px', backgroundColor: TEST_COLORS.neutral.backgroundLight }}>
                  <Paragraph style={{ margin: 0, fontStyle: 'italic' }}>
                    "{exercise.texte_principal}"
                  </Paragraph>
                </Card>
              )}

              {/* Questions et réponses */}
              <Space direction="vertical" style={{ width: '100%' }} size="large">
                {exercise.questions.map((question, questionIndex) => {
                  const userOption = question.options.find(opt => opt.id === question.userAnswer);
                  const correctOption = question.options.find(opt => opt.id === question.correctAnswer);

                  return (
                    <Card 
                      key={question.id} 
                      size="small"
                      style={{ 
                        border: `2px solid ${question.isCorrect ? '#52c41a' : '#f5222d'}40`,
                        backgroundColor: question.isCorrect ? '#52c41a08' : '#f5222d08'
                      }}
                    >
                      <div style={{ marginBottom: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                          {question.isCorrect ? (
                            <CheckCircleOutlined style={{ color: '#52c41a', fontSize: '18px' }} />
                          ) : (
                            <CloseCircleOutlined style={{ color: '#f5222d', fontSize: '18px' }} />
                          )}
                          <Text strong style={{ fontSize: '16px' }}>
                            Question {questionIndex + 1}: {question.texte}
                          </Text>
                        </div>
                      </div>

                      <div style={{ paddingLeft: '26px' }}>
                        {/* Réponse de l'utilisateur */}
                        <div style={{ marginBottom: '8px' }}>
                          <Text strong>Votre réponse: </Text>
                          {userOption ? (
                            <Tag color={question.isCorrect ? 'success' : 'error'}>
                              {userOption.id}. {userOption.texte}
                            </Tag>
                          ) : (
                            <Tag color="default">Aucune réponse</Tag>
                          )}
                        </div>

                        {/* Bonne réponse si différente */}
                        {!question.isCorrect && correctOption && (
                          <div>
                            <Text strong>Bonne réponse: </Text>
                            <Tag color="success">
                              {correctOption.id}. {correctOption.texte}
                            </Tag>
                          </div>
                        )}
                      </div>
                    </Card>
                  );
                })}
              </Space>

              {exerciseIndex < section.exercises.length - 1 && (
                <Divider style={{ marginTop: '24px' }} />
              )}
            </div>
          ))}
        </Card>
      ))}

      {/* Boutons d'action */}
      <Card style={{ textAlign: 'center', marginTop: '24px' }}>
        <Space size="large">
          <Button 
            type="primary" 
            size="large"
            onClick={onClose}
            style={{ 
              backgroundColor: TEST_COLORS.primary,
              borderColor: TEST_COLORS.primary
            }}
          >
            Fermer la correction
          </Button>
          <Button 
            size="large"
            onClick={() => window.print()}
            style={{ 
              borderColor: TEST_COLORS.neutral.border,
              color: TEST_COLORS.neutral.text
            }}
          >
            Imprimer les résultats
          </Button>
        </Space>
      </Card>
    </div>
  );
};

export default TestCorrection; 