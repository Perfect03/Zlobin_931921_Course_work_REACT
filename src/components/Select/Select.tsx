import styles from './Select.module.scss';
import { NavLink } from 'react-router-dom';
import Carno from '../../assets/Carno.png';
import Table from '../../assets/Table.png';
import { useEffect, useState } from 'react';

interface IProps {
  what: string
}

const Select = ({what}: IProps) => {
  const [animation, setAnimation] = useState(false);
  useEffect(() => {
    console.log(what);
    setAnimation(true);
  }, []);
  return (
  <div className={styles.container}>
    <div className={`${styles.menu} ${animation ? styles.animation_end : styles.animation_start}`}>
    <div className={styles.title}>Выберите способ построения {what}:</div>
    <ol>
      <li><span>по автоматически генерируемым функциям</span></li>
      <li><span>по заранее построенным (преподавателем) функциям</span></li>
    </ol>
    </div>
  </div>
    /*<Context.Provider value={{ persons: data }}>
      <BrowserRouter>
        
      </BrowserRouter>
    </Context.Provider>*/
  );
};

export default Select;
