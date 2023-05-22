import styles from './Main.module.scss';
import { Link } from 'react-router-dom';
import Karnaugh from '../../assets/Karnaugh.png';
import Table from '../../assets/Table.png';
import Zhegalkin from '../../assets/Zhegalkin.png';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const Main = () => {
  const [animation, setAnimation] = useState(false);
  useEffect(() => {
    setAnimation(true);
  }, []);
  const { t } = useTranslation();
  return (
    <main>
      <div className={styles.container}>
        <div
          className={`${styles.menu} ${animation ? styles.animation_end : styles.animation_start}`}
        >
          <div className={styles.title}>{t('Choose trainer')}:</div>
          <div className={styles.trainers}>
            <Link className={styles.trainer} to="karnaugh/random">
              <div className={styles.title}>{t('Karnaugh map')}</div>
              <img src={Table} alt="Карта Карно" />
            </Link>
            <Link className={styles.trainer} to="table/random">
              <div className={styles.title}>{t('Truth table')}</div>
              <img src={Karnaugh} alt="Таблица истинности" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Main;
