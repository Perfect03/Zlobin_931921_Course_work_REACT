import styles from './Main.module.scss';
import { Link } from 'react-router-dom';
import Carno from '../../assets/Carno.png';
import Table from '../../assets/Table.png';
import { useEffect, useState } from 'react';

const Main = () => {
  const [animation, setAnimation] = useState(false);
  useEffect(() => {
    setAnimation(true);
  }, []);
  return (
  <div className={styles.container}>
    <div className={`${styles.menu} ${animation ? styles.animation_end : styles.animation_start}`}>
    <div className={styles.title}>Выберите тренажёр:</div>
    <div className={styles.trainers}>
      <Link className={styles.trainer} to="carno">
      <div className={styles.title}>Карта Карно</div>
      <img src={Table} alt="Карта Карно" />
      </Link>
      <Link className={styles.trainer} to="table">
      <div className={styles.title}>Таблица <br></br> истинности</div>
      <img src={Carno} alt="Таблица истинности" />
      </Link>
    </div>
    </div>
  </div>
    /*<Context.Provider value={{ persons: data }}>
      <BrowserRouter>
        
      </BrowserRouter>
    </Context.Provider>*/
  );
};

export default Main;
