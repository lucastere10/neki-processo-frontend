import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MdLanguage } from 'react-icons/md';
import { BiSolidBrightnessHalf } from 'react-icons/bi';
import { useTheme } from 'next-themes';

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
    <div className="items-center accessibility flex gap-2">
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
      <a
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        tabIndex={0}
        aria-label={t('changeTheme')}
      >
        <BiSolidBrightnessHalf
          className={`${theme === 'dark' ? 'text-tx-dark' : 'text-tx-light'}`}
          size={40}
          aria-label="ícone referente a mudança de tema escuro"
          tabIndex={0}
        />
      </a>
    </div>
  );
};

export default ToggleThemeLanguage;
