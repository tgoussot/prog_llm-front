import React, { useState, useEffect } from 'react';
import { Typography, Space } from 'antd';

const { Text, Title } = Typography;

const LoadingScreen = ({ isVisible, message = "Chargement en cours..." }) => {
  const [currentAnecdoteIndex, setCurrentAnecdoteIndex] = useState(0);

  const anecdotes = [
    "• Il existe plus de 7000 langues dans le monde !",
    "• Le mandarin est parlé par plus d'un milliard de personnes.",
    "• L'hébreu est la seule langue 'morte' qui a été ressuscitée.",
    "• Le japonais a trois systèmes d'écriture différents.",
    "• L'espéranto a été créé en 1887 pour être une langue universelle.",
    "• L'alphabet cambodgien compte 74 lettres !",
    "• Le chinois est une langue tonale avec 4 tons principaux.",
    "• Shakespeare a inventé plus de 1700 mots en anglais.",
    "• Hawaï n'a que 13 lettres dans son alphabet.",
    "• Apprendre une nouvelle langue améliore la mémoire !",
    "• Le basque n'est apparenté à aucune autre langue connue.",
    "• L'arabe se lit de droite à gauche.",
    "• Le français était la langue de la diplomatie jusqu'au 20e siècle.",
    "• Certaines langues n'ont que 3 nombres : un, deux et beaucoup.",
    "• L'italien est considéré comme la plus belle langue du monde.",
    "• Le finnois a 15 cas grammaticaux différents.",
    "• Le vietnamien utilise 6 tons différents pour changer le sens des mots.",
    "• L'islandais moderne ressemble encore beaucoup au vieux norrois.",
    "• Le swahili est parlé par plus de 100 millions de personnes en Afrique.",
    "• Le gallois compte plus de 50 façons de dire 'bleu'."
  ];

  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setCurrentAnecdoteIndex((prevIndex) => 
        (prevIndex + 1) % anecdotes.length
      );
    }, 3000); // Change d'anecdote toutes les 3 secondes

    return () => clearInterval(interval);
  }, [isVisible, anecdotes.length]);

  if (!isVisible) return null;

  // Robot GIF animé depuis Giphy
  const RobotGif = () => (
    <div className="robot-container">
      <img
        src="https://media.giphy.com/media/3oKIPnAiaMCws8nOsE/giphy.gif"
        alt="Robot IA animé"
        className="robot-gif"
        style={{
          width: '200px',
          height: '200px',
          borderRadius: '25px',
          filter: 'drop-shadow(0 10px 20px rgba(74, 144, 226, 0.3))',
          background: 'rgba(255, 255, 255, 0.9)',
          padding: '15px'
        }}
      />
    </div>
  );

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999,
      backdropFilter: 'blur(5px)'
    }}>
      <Space direction="vertical" align="center" size="large">
        {/* Robot GIF animé */}
        <div style={{ marginBottom: '20px' }}>
          <RobotGif />
        </div>

        {/* Message de chargement */}
        <Title level={3} style={{ 
          color: '#1890ff', 
          margin: 0,
          textAlign: 'center'
        }}>
          {message}
        </Title>

        {/* Anecdotes qui défilent */}
        <div style={{
          minHeight: '60px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          maxWidth: '500px',
          textAlign: 'center',
          padding: '0 20px'
        }}>
          <Text 
            className="anecdote-text"
            style={{ 
              fontSize: '16px',
              color: '#666',
              lineHeight: '1.5'
            }}
          >
            {anecdotes[currentAnecdoteIndex]}
          </Text>
        </div>
      </Space>
    </div>
  );
};

export default LoadingScreen; 