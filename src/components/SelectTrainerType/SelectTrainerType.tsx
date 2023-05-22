import styles from './SelectTrainerType.module.scss';
import { Link, NavLink } from 'react-router-dom';
import Carno from '../../assets/Carno.png';
import Table from '../../assets/Table.png';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const SelectTrainerType = () => {
  const [animation, setAnimation] = useState(false);
  const { t } = useTranslation();
  useEffect(() => {
    setAnimation(true);
  }, []);
  return (
    <div className={styles.container}>
      <div
        className={`${styles.menu} ${animation ? styles.animation_end : styles.animation_start}`}
      >
        <div className={styles.title}>{t('Select way to build: ')}</div>
        <ol>
          <Link to="random">
            <li>
              <span>{t('by automatically generated functions')}</span>
            </li>
          </Link>
          <Link to="fromTeacher">
            <li>
              <span>{t('by functions pre-build by the teacher')}</span>
            </li>
          </Link>
        </ol>
      </div>
    </div>
  );
};

export default SelectTrainerType;
