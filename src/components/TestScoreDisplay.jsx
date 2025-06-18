import React from 'react';
import { Card, Typography, Space, Button, Progress, Tag } from 'antd';
import { TrophyOutlined, BookOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { TEST_COLORS } from '../styles/testColors';

const { Title, Text } = Typography;

const TestScoreDisplay = ({ test, responses, sectionsToUse, onViewCorrection, onClose, language }) => {
  
  // Calculer le score total (même logique que TestCorrection)
  const calculateScore = () => {
    let totalQuestions = 0;
    let correctAnswers = 0;
    const sectionScores = [];

    sectionsToUse.forEach((section, sectionIndex) => {
      let sectionCorrect = 0;
      let sectionTotal = 0;

      section.exercises.forEach((exercise, exerciseIndex) => {
        const exerciseKey = `${section.key}_${exerciseIndex}`;
        const userResponses = responses[exerciseKey] || {};
        
        exercise.contenu?.elements?.forEach((element) => {
          sectionTotal++;
          totalQuestions++;
          const userAnswer = userResponses[element.id];
          const correctAnswer = element.reponse_correcte;
          const isCorrect = userAnswer === correctAnswer;
          
          if (isCorrect) {
            correctAnswers++;
            sectionCorrect++;
          }
        });
      });

      sectionScores.push({
        sectionName: section.title,
        color: section.color,
        correct: sectionCorrect,
        total: sectionTotal,
        percentage: sectionTotal > 0 ? Math.round((sectionCorrect / sectionTotal) * 100) : 0
      });
    });

    const scorePercentage = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;

    return {
      totalQuestions,
      correctAnswers,
      scorePercentage,
      sectionScores
    };
  };

  const { totalQuestions, correctAnswers, scorePercentage, sectionScores } = calculateScore();

  // Déterminer le niveau de performance
  const getPerformanceLevel = (score) => {
    if (score >= 90) return { level: 'Excellent', color: '#52c41a', icon: '🏆', message: 'Performance exceptionnelle !' };
    if (score >= 75) return { level: 'Très bien', color: '#1890ff', icon: '🌟', message: 'Très bonne maîtrise !' };
    if (score >= 60) return { level: 'Bien', color: '#faad14', icon: '👍', message: 'Bonne performance !' };
    if (score >= 40) return { level: 'Passable', color: '#fa8c16', icon: '📚', message: 'Continuez vos efforts !' };
    return { level: 'À améliorer', color: '#f5222d', icon: '💪', message: 'De la pratique vous aidera !' };
  };

  const performance = getPerformanceLevel(scorePercentage);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      {/* Carte principale avec le score */}
      <Card 
        style={{ 
          marginBottom: '24px', 
          textAlign: 'center', 
          backgroundColor: TEST_COLORS.neutral.backgroundLight,
          border: `2px solid ${performance.color}40`
        }}
      >
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div>
            <TrophyOutlined style={{ fontSize: '64px', color: performance.color, marginBottom: '16px' }} />
            <Title level={2} style={{ margin: 0, color: TEST_COLORS.neutral.text }}>
              Test de {test?.langue || language?.name} terminé !
            </Title>
          </div>
          
          <div style={{ 
            padding: '32px', 
            backgroundColor: performance.color + '15', 
            borderRadius: '16px',
            border: `2px solid ${performance.color}40`
          }}>
            <Text style={{ fontSize: '36px', fontWeight: 'bold', color: performance.color }}>
              {performance.icon}
            </Text>
            <br />
            <Text style={{ fontSize: '28px', fontWeight: 'bold', color: performance.color }}>
              {correctAnswers}/{totalQuestions}
            </Text>
            <br />
            <Text style={{ fontSize: '24px', fontWeight: 'bold', color: performance.color }}>
              {scorePercentage}%
            </Text>
            <br />
            <Text style={{ fontSize: '18px', color: performance.color, fontWeight: '500' }}>
              {performance.level}
            </Text>
            <br />
            <Text style={{ fontSize: '16px', color: TEST_COLORS.neutral.textSecondary }}>
              {performance.message}
            </Text>
          </div>

          <Progress 
            percent={scorePercentage} 
            strokeColor={performance.color}
            trailColor={TEST_COLORS.neutral.border}
            strokeWidth={16}
            format={(percent) => `${percent}%`}
          />
        </Space>
      </Card>

      {/* Résumé par section */}
      <Card 
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BookOutlined />
            <span>Résumé par section</span>
          </div>
        }
        style={{ marginBottom: '24px' }}
      >
        <Space direction="vertical" style={{ width: '100%' }} size="middle">
          {sectionScores.map((section, index) => (
            <div key={index} style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              padding: '12px 16px',
              backgroundColor: (section.color.light || section.color.main + '08'),
              borderRadius: '8px',
              border: `1px solid ${section.color.border || section.color.main + '20'}`
            }}>
              <div>
                <Text strong style={{ color: section.color.text || section.color.main }}>
                  {section.sectionName}
                </Text>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Text style={{ color: TEST_COLORS.neutral.text }}>
                  {section.correct}/{section.total}
                </Text>
                <Tag color={section.percentage >= 60 ? 'success' : section.percentage >= 40 ? 'warning' : 'error'}>
                  {section.percentage}%
                </Tag>
              </div>
            </div>
          ))}
        </Space>
      </Card>

      {/* Actions */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
        <Button 
          size="large"
          onClick={onClose}
          style={{
            borderColor: TEST_COLORS.neutral.border,
            color: TEST_COLORS.neutral.text
          }}
        >
          Fermer
        </Button>
        <Button 
          type="primary"
          size="large"
          icon={<ArrowRightOutlined />}
          iconPosition="end"
          onClick={onViewCorrection}
          style={{
            backgroundColor: TEST_COLORS.primary,
            borderColor: TEST_COLORS.primary
          }}
        >
          Voir la correction détaillée
        </Button>
      </div>
    </div>
  );
};

export default TestScoreDisplay; 