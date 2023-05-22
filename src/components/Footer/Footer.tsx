import styles from './Footer.module.scss';
import back from '../../assets/back.svg';
import logo_tsu_black from '../../assets/logo_tsu_black.png';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Context, ContextType } from '../../languageContext';
import { useContext, useEffect, useState } from 'react';

const Footer = () => {
  const { language, setLanguage } = useContext(Context) as ContextType;

  return (
    <footer>
      <img height={70} src={logo_tsu_black} alt="TSU" />
      <div className={styles.right}>
        <span>2023</span>
        <a href="https://github.com/Perfect03/">Github</a>
      </div>
    </footer>
    /*<Context.Provider value={{ persons: data }}>
      <BrowserRouter>
        
      </BrowserRouter>
    </Context.Provider>*/
  );
};

export default Footer;
