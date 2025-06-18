import React, { useState } from 'react';
import { AutoComplete, Input, Typography, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { FLAG_CDN_URL } from '../constants/api';
import { searchLanguages, saveLanguage } from '../services/languageService';

const { Title } = Typography;

const LanguageSearch = ({ onLanguageAdded }) => {
  const [searchValue, setSearchValue] = useState('');
  const [options, setOptions] = useState([]);

  const handleSearch = async (value) => {
    setSearchValue(value);
    if (value.length < 2) {
      setOptions([]);
      return;
    }

    try {
      const languages = await searchLanguages(value);
      
      const languageOptions = languages.map(lang => ({
        value: lang.code,
        label: (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {lang.country_code && (
              <img 
                src={`${FLAG_CDN_URL}/w20/${lang.country_code.toLowerCase()}.png`}
                alt={lang.country_name || lang.name}
                style={{ width: 20, height: 15, objectFit: 'cover' }}
              />
            )}
            <span>{lang.name}</span>
            {lang.country_name && (
              <span style={{ color: '#666', fontSize: '0.9em' }}>
                ({lang.country_name})
              </span>
            )}
          </div>
        ),
        language: lang
      }));
      
      setOptions(languageOptions);
    } catch (error) {
      message.error('Erreur lors de la recherche des langues');
    }
  };

  const handleSelect = async (value, option) => {
    try {
      const language = option.language;
      console.log(language);
      await saveLanguage(language);
      
      message.success(`${language.name} a été ajouté avec succès !`);
      onLanguageAdded();
      setSearchValue('');
      setOptions([]);
    } catch (error) {
      message.error('Erreur lors de l\'ajout de la langue');
    }
  };

  return (
    <div style={{ width: '100%', maxWidth: 400, margin: '0 auto' }}>
      <Title level={4} style={{ textAlign: 'center' }}>
        Vous voulez apprendre une autre langue ?
      </Title>
      <AutoComplete
        options={options}
        onSearch={handleSearch}
        onSelect={handleSelect}
        value={searchValue}
        onChange={setSearchValue}
        style={{ width: '100%' }}
      >
        <Input
          size="large"
          placeholder="Rechercher une langue..."
          prefix={<PlusOutlined />}
        />
      </AutoComplete>
    </div>
  );
};

export default LanguageSearch; 