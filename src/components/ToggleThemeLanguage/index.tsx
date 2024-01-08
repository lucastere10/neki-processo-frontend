import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { CiCirclePlus, CiCircleMinus } from 'react-icons/ci';
import { MdLanguage } from 'react-icons/md';
import { BiSolidBrightnessHalf } from 'react-icons/bi';
import { useTheme } from 'next-themes';
import { Switch } from '../Switch';

const ToggleThemeLanguage: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { t, i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState<string>(i18n.language);

  const handleChangeLanguage = () => {
    const newLanguage = currentLanguage === 'en' ? 'pt' : 'en';
    i18n.changeLanguage(newLanguage);
    setCurrentLanguage(newLanguage);
  };

  return (
    <div className="items-center accessibility flex gap-3 mr-4">
      <button
        type="button"
        className="flex gap-1 items-center bg-transparent text-black dark:text-white text-xl p-2"
        onClick={handleChangeLanguage}
        aria-label={t('changeLanguage')}
        tabIndex={0}
      >
        <MdLanguage
          className={`${theme === 'dark' ? 'text-tx-dark' : 'text-tx-light'}`}
          size={30}
          tabIndex={0}
          aria-label="ícone referente ao idioma"
        />
        {currentLanguage.toUpperCase()}
      </button>
      <div className="flex items-center gap-3 my-2 justify-between">
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            value="true"
            className="sr-only peer"
            tabIndex={0}
          />
          <Switch />
        </label>
      </div>
    </div>
  );
};

export default ToggleThemeLanguage;
