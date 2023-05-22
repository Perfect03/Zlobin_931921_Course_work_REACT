import styles from './Header.module.scss';
import back from '../../assets/back.svg';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import i18n from '../../i18n';
import { Context, ContextType } from '../../languageContext';
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const { language, setLanguage } = useContext(Context) as ContextType;
  const location = useLocation();

  const handleLenguageChange = (lang: string) => {
    if (lang === 'ru') {
      i18n.changeLanguage('ru');
      setLanguage('ru');
    } else if (lang === 'en') {
      i18n.changeLanguage('en');
      setLanguage('en');
    }
  };

  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <header>
      {location.pathname.slice(1) ? (
        <div className={styles.left}>
          <div className={styles.back} onClick={() => navigate(-1)}>
            <img src={back} width={32} height={32} alt="back" />
          </div>
          <h1 className={styles.title}>
            {t(
              location.pathname.includes('karnaugh')
                ? 'Karnaugh map building'
                : 'Truth Table building'
            )}
          </h1>
        </div>
      ) : (
        ''
      )}
      <div className={styles.langs}>
        <span
          className={`${styles.lang} ${language === 'ru' ? styles.active : ''}`}
          onClick={() => handleLenguageChange('ru')}
        >
          RU
        </span>
        <span
          className={`${styles.lang} ${language === 'en' ? styles.active : ''}`}
          onClick={() => handleLenguageChange('en')}
        >
          EN
        </span>
      </div>
    </header>
    /*<Context.Provider value={{ persons: data }}>
      <BrowserRouter>
        
      </BrowserRouter>
    </Context.Provider>*/
  );
};

export default Header;
