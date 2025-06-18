import React, { useState, useEffect } from 'react';
import { Card, Button, Progress, Typography, Space, message, Divider } from 'antd';
import { CheckCircleOutlined, ArrowRightOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import ComprehensionEcriteExercice from './exercices/ComprehensionEcriteExercice';
import GrammaireExercice from './exercices/GrammaireExercice';
import VocabulaireExercice from './exercices/VocabulaireExercice';
import TestCorrection from './TestCorrection';
import TestScoreDisplay from './TestScoreDisplay';
import { TEST_COLORS, EXERCISE_CARD_STYLES } from '../styles/testColors';

const { Title, Text } = Typography;

const TestInterface = ({ test, language, onSubmit, onClose }) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [responses, setResponses] = useState({});
  const [completedExercises, setCompletedExercises] = useState(new Set());
  const [showCorrection, setShowCorrection] = useState(false);
  const [showScore, setShowScore] = useState(false);

  // Réinitialiser tous les états quand un nouveau test est chargé
  useEffect(() => {
    setCurrentSection(0);
    setCurrentExercise(0);
    setResponses({});
    setCompletedExercises(new Set());
    setShowCorrection(false);
    setShowScore(false);
  }, [test, language]);

  // Debug: afficher la structure du test
  console.log('Structure du test reçu:', test);
  
  // Extraire le vrai test de la structure imbriquée
  const actualTest = test?.test || test;
  console.log('Test extrait:', actualTest);
  console.log('Compréhension écrite:', actualTest?.comprehension_ecrite);
  console.log('Grammaire:', actualTest?.grammaire);
  console.log('Vocabulaire:', actualTest?.vocabulaire);

  // Organiser les exercices par section
  const sections = [
    {
      key: 'comprehension_ecrite',
      title: 'Compréhension écrite',
      exercises: actualTest?.comprehension_ecrite || [],
      component: ComprehensionEcriteExercice,
      color: TEST_COLORS.comprehension
    },
    {
      key: 'grammaire',
      title: 'Grammaire',
      exercises: actualTest?.grammaire || [],
      component: GrammaireExercice,
      color: TEST_COLORS.grammaire
    },
    {
      key: 'vocabulaire',
      title: 'Vocabulaire',
      exercises: actualTest?.vocabulaire || [],
      component: VocabulaireExercice,
      color: TEST_COLORS.vocabulaire
    }
  ].filter(section => section.exercises.length > 0);

  console.log('Sections filtrées:', sections);

  // Test de fallback si aucun exercice n'est disponible
  const fallbackTest = {
    comprehension_ecrite: [
      {
        consigne: "Lisez le texte suivant et répondez aux questions.",
        contenu: {
          texte_principal: "La technologie moderne transforme notre façon de vivre et de travailler. Les smartphones, les ordinateurs et Internet ont révolutionné la communication et l'accès à l'information. Cependant, cette évolution rapide pose aussi des défis, notamment en matière de protection de la vie privée et de dépendance technologique.",
          elements: [
            { 
              id: 1, 
              texte: "Quel est le sujet principal du texte ?", 
              type: "QCM",
              options: [
                { id: "A", texte: "La transformation technologique de la société", est_correcte: true },
                { id: "B", texte: "Les problèmes de communication", est_correcte: false },
                { id: "C", texte: "L'histoire des ordinateurs", est_correcte: false },
                { id: "D", texte: "Les coûts de la technologie", est_correcte: false }
              ],
              reponse_correcte: "A"
            },
            { 
              id: 2, 
              texte: "Selon le texte, quels sont les principaux avantages mentionnés ?", 
              type: "QCM",
              options: [
                { id: "A", texte: "La rapidité et l'efficacité", est_correcte: false },
                { id: "B", texte: "La communication et l'accès à l'information", est_correcte: true },
                { id: "C", texte: "La réduction des coûts", est_correcte: false },
                { id: "D", texte: "La facilité d'utilisation", est_correcte: false }
              ],
              reponse_correcte: "B"
            },
            { 
              id: 3, 
              texte: "Quels défis sont évoqués dans le texte ?", 
              type: "QCM",
              options: [
                { id: "A", texte: "Les coûts élevés et la complexité", est_correcte: false },
                { id: "B", texte: "La formation des utilisateurs", est_correcte: false },
                { id: "C", texte: "La protection de la vie privée et la dépendance", est_correcte: true },
                { id: "D", texte: "La maintenance et les pannes", est_correcte: false }
              ],
              reponse_correcte: "C"
            }
          ]
        },
        niveau_cible: "B1",
        competence: "Compréhension écrite - Texte informatif"
      }
    ],
    grammaire: [
      {
        consigne: "Choisissez la forme correcte du verbe pour compléter chaque phrase.",
        contenu: {
          texte_principal: "",
          elements: [
            { 
              id: 1, 
              texte: "Je _____ au travail tous les jours.", 
              type: "QCM",
              options: [
                { id: "A", texte: "vais", est_correcte: true },
                { id: "B", texte: "aller", est_correcte: false },
                { id: "C", texte: "allais", est_correcte: false },
                { id: "D", texte: "irai", est_correcte: false }
              ],
              reponse_correcte: "A"
            },
            { 
              id: 2, 
              texte: "Ils _____ leurs devoirs le soir.", 
              type: "QCM",
              options: [
                { id: "A", texte: "faire", est_correcte: false },
                { id: "B", texte: "font", est_correcte: true },
                { id: "C", texte: "faisaient", est_correcte: false },
                { id: "D", texte: "feront", est_correcte: false }
              ],
              reponse_correcte: "B"
            },
            { 
              id: 3, 
              texte: "Nous _____ le bus pour aller en ville.", 
              type: "QCM",
              options: [
                { id: "A", texte: "prendre", est_correcte: false },
                { id: "B", texte: "prenions", est_correcte: false },
                { id: "C", texte: "prenons", est_correcte: true },
                { id: "D", texte: "prendrons", est_correcte: false }
              ],
              reponse_correcte: "C"
            }
          ]
        },
        niveau_cible: "A2",
        competence: "Conjugaison - Présent"
      }
    ],
    vocabulaire: [
      {
        consigne: "Choisissez le mot qui convient le mieux pour compléter chaque phrase.",
        contenu: {
          texte_principal: "",
          elements: [
            { 
              id: 1, 
              texte: "Il fait très _____ aujourd'hui, je vais mettre un manteau.", 
              type: "QCM",
              options: [
                { id: "A", texte: "chaud", est_correcte: false },
                { id: "B", texte: "froid", est_correcte: true },
                { id: "C", texte: "beau", est_correcte: false },
                { id: "D", texte: "mauvais", est_correcte: false }
              ],
              reponse_correcte: "B"
            },
            { 
              id: 2, 
              texte: "J'ai _____ ce livre la semaine dernière, il était passionnant.", 
              type: "QCM",
              options: [
                { id: "A", texte: "lu", est_correcte: true },
                { id: "B", texte: "écrit", est_correcte: false },
                { id: "C", texte: "acheté", est_correcte: false },
                { id: "D", texte: "vendu", est_correcte: false }
              ],
              reponse_correcte: "A"
            },
            { 
              id: 3, 
              texte: "Pouvez-vous me _____ où se trouve la gare ?", 
              type: "QCM",
              options: [
                { id: "A", texte: "donner", est_correcte: false },
                { id: "B", texte: "dire", est_correcte: true },
                { id: "C", texte: "montrer", est_correcte: false },
                { id: "D", texte: "apporter", est_correcte: false }
              ],
              reponse_correcte: "B"
            }
          ]
        },
        niveau_cible: "A2",
        competence: "Vocabulaire - Vie quotidienne"
      }
    ]
  };

  // Utiliser le test de fallback si aucune section n'est disponible
  const testToUse = sections.length === 0 ? fallbackTest : actualTest;
  const sectionsToUse = sections.length === 0 ? [
    {
      key: 'comprehension_ecrite',
      title: 'Compréhension écrite',
      exercises: fallbackTest.comprehension_ecrite,
      component: ComprehensionEcriteExercice,
      color: TEST_COLORS.comprehension
    },
    {
      key: 'grammaire',
      title: 'Grammaire',
      exercises: fallbackTest.grammaire,
      component: GrammaireExercice,
      color: TEST_COLORS.grammaire
    },
    {
      key: 'vocabulaire',
      title: 'Vocabulaire',
      exercises: fallbackTest.vocabulaire,
      component: VocabulaireExercice,
      color: TEST_COLORS.vocabulaire
    }
  ] : sections;

  console.log('Test utilisé:', testToUse);
  console.log('Sections utilisées:', sectionsToUse);

  // Calculer le progrès total
  const totalExercises = sectionsToUse.reduce((total, section) => total + section.exercises.length, 0);
  const completedCount = completedExercises.size;
  const progressPercent = totalExercises > 0 ? (completedCount / totalExercises) * 100 : 0;

  // Obtenir l'exercice actuel
  const currentSectionData = sectionsToUse[currentSection];
  const currentExerciseData = currentSectionData?.exercises[currentExercise];

  // Générer une clé unique pour l'exercice actuel
  const getCurrentExerciseKey = () => {
    if (!currentSectionData || !currentExerciseData) return null;
    return `${currentSectionData.key}_${currentExercise}`;
  };

  // Sauvegarder une réponse
  const saveResponse = (exerciseKey, response) => {
    setResponses(prev => ({
      ...prev,
      [exerciseKey]: response
    }));
    
    // Marquer l'exercice comme complété si la réponse n'est pas vide
    if (response && Object.keys(response).length > 0) {
      setCompletedExercises(prev => new Set([...prev, exerciseKey]));
    } else {
      setCompletedExercises(prev => {
        const newSet = new Set(prev);
        newSet.delete(exerciseKey);
        return newSet;
      });
    }
  };

  // Navigation
  const goToNextExercise = () => {
    if (currentExercise < currentSectionData.exercises.length - 1) {
      setCurrentExercise(prev => prev + 1);
    } else if (currentSection < sectionsToUse.length - 1) {
      setCurrentSection(prev => prev + 1);
      setCurrentExercise(0);
    }
  };

  const goToPreviousExercise = () => {
    if (currentExercise > 0) {
      setCurrentExercise(prev => prev - 1);
    } else if (currentSection > 0) {
      setCurrentSection(prev => prev - 1);
      const prevSection = sectionsToUse[currentSection - 1];
      setCurrentExercise(prevSection.exercises.length - 1);
    }
  };

  const isFirstExercise = currentSection === 0 && currentExercise === 0;
  const isLastExercise = currentSection === sectionsToUse.length - 1 && 
                        currentExercise === currentSectionData?.exercises.length - 1;

  // Soumettre le test
  const handleSubmit = () => {
    if (completedCount < totalExercises) {
      message.warning(`Vous avez répondu à ${completedCount}/${totalExercises} exercices. Voulez-vous vraiment soumettre ?`);
    }
    
    // Afficher d'abord la note
    setShowScore(true);
  };

  // Passer de l'écran de score à la correction
  const handleViewCorrection = () => {
    setShowScore(false);
    setShowCorrection(true);
  };

  // Fermer depuis l'écran de score
  const handleCloseFromScore = () => {
    setShowScore(false);
    onSubmit(responses); // Appeler la fonction originale
    onClose(); // Fermer le modal
  };

  // Fermer la correction et le test
  const handleCloseCorrection = () => {
    setShowCorrection(false);
    onSubmit(responses); // Appeler la fonction originale
    onClose(); // Fermer le modal
  };

  if (!currentSectionData || !currentExerciseData) {
    return (
      <Card style={{ ...EXERCISE_CARD_STYLES, textAlign: 'center', padding: '40px' }}>
        <Text style={{ color: TEST_COLORS.neutral.textSecondary }}>
          Aucun exercice disponible dans ce test.
        </Text>
        <br />
        <Button 
          onClick={onClose} 
          style={{ 
            marginTop: '16px',
            borderColor: TEST_COLORS.primary,
            color: TEST_COLORS.primary
          }}
        >
          Fermer
        </Button>
      </Card>
    );
  }

  const ExerciseComponent = currentSectionData.component;
  const exerciseKey = getCurrentExerciseKey();
  const currentResponse = responses[exerciseKey] || {};
  const currentColor = currentSectionData.color;

  // Si on affiche le score, render le composant de score
  if (showScore) {
    return (
      <TestScoreDisplay
        test={testToUse}
        responses={responses}
        sectionsToUse={sectionsToUse}
        onViewCorrection={handleViewCorrection}
        onClose={handleCloseFromScore}
        language={language}
      />
    );
  }

  // Si on affiche la correction, render le composant de correction
  if (showCorrection) {
    return (
      <TestCorrection
        test={testToUse}
        responses={responses}
        sectionsToUse={sectionsToUse}
        onClose={handleCloseCorrection}
        language={language}
      />
    );
  }

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      {/* En-tête avec progrès */}
      <Card style={{ ...EXERCISE_CARD_STYLES, marginBottom: '24px', backgroundColor: TEST_COLORS.neutral.backgroundLight }}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Title level={3} style={{ margin: 0, color: TEST_COLORS.neutral.text }}>
              Test de {test?.langue || language?.name}
            </Title>
            <Text strong style={{ color: TEST_COLORS.neutral.text }}>
              {completedCount}/{totalExercises} exercices complétés
            </Text>
          </div>
          
          <Progress 
            percent={progressPercent} 
            status={completedCount === totalExercises ? 'success' : 'active'}
            strokeColor={TEST_COLORS.progress.gradient}
            trailColor={TEST_COLORS.progress.background}
            strokeWidth={8}
          />
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text type="secondary" style={{ color: currentColor.text, fontWeight: '500' }}>
              {currentSectionData.title} - Exercice {currentExercise + 1}/{currentSectionData.exercises.length}
            </Text>
            <Text type="secondary" style={{ color: TEST_COLORS.neutral.textSecondary }}>
              Niveau: {currentExerciseData.niveau_cible || 'Non spécifié'}
            </Text>
          </div>
        </Space>
      </Card>

      {/* Exercice actuel */}
      <Card style={{ ...EXERCISE_CARD_STYLES, backgroundColor: TEST_COLORS.neutral.backgroundLight }}>
        <ExerciseComponent
          exercise={currentExerciseData}
          response={currentResponse}
          onResponseChange={(response) => saveResponse(exerciseKey, response)}
          exerciseNumber={currentExercise + 1}
        />
        
        <Divider style={{ borderColor: TEST_COLORS.neutral.borderLight }} />
        
        {/* Navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button 
            onClick={goToPreviousExercise}
            disabled={isFirstExercise}
            icon={<ArrowLeftOutlined />}
            style={{
              borderColor: isFirstExercise ? TEST_COLORS.neutral.border : TEST_COLORS.primary,
              color: isFirstExercise ? TEST_COLORS.neutral.textLight : TEST_COLORS.primary
            }}
          >
            Précédent
          </Button>
          
          <Space>
            {completedExercises.has(exerciseKey) && (
              <CheckCircleOutlined style={{ color: TEST_COLORS.completed, fontSize: '18px' }} />
            )}
            <Text strong style={{ color: TEST_COLORS.neutral.text }}>
              Exercice {currentExercise + 1} sur {currentSectionData.exercises.length}
            </Text>
          </Space>
          
          {!isLastExercise ? (
            <Button 
              onClick={goToNextExercise}
              type="primary"
              icon={<ArrowRightOutlined />}
              iconPosition="end"
              style={{
                backgroundColor: TEST_COLORS.primary,
                borderColor: TEST_COLORS.primary
              }}
            >
              Suivant
            </Button>
          ) : (
            <Button 
              onClick={handleSubmit}
              type="primary"
              size="large"
              style={{ 
                backgroundColor: completedCount === totalExercises ? TEST_COLORS.success : TEST_COLORS.primary,
                borderColor: completedCount === totalExercises ? TEST_COLORS.success : TEST_COLORS.primary
              }}
            >
              Soumettre le test
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default TestInterface; 