import styles from './SelectVarsCount.module.scss';
import { Link, NavLink } from 'react-router-dom';
import Carno from '../../assets/Carno.png';
import Table from '../../assets/Table.png';
import { useEffect, useState } from 'react';

const SelectVarsCount = () => {
  const [animation, setAnimation] = useState(false);
  useEffect(() => {
    setAnimation(true);
  }, []);
  return (
  <div className={styles.container}>
    <div className={`${styles.menu} ${animation ? styles.animation_end : styles.animation_start}`}>
    <div className={styles.title}>Выберите количество переменных:</div>
    <div className={styles.bar}>
    <Link to="2"><div className={styles.var}>2</div></Link>
    <Link to="3"><div className={styles.var}>3</div></Link>
    <Link to="4"><div className={styles.var}>4</div></Link>
    <Link to="5"><div className={styles.var}>5</div></Link>
    </div>
    </div>
  </div>
    /*<Context.Provider value={{ persons: data }}>
      <BrowserRouter>
        
      </BrowserRouter>
    </Context.Provider>*/
  );
};

export default SelectVarsCount;
