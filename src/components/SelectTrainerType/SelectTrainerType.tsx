import styles from './SelectTrainerType.module.scss';
import { Link, NavLink } from 'react-router-dom';
import Carno from '../../assets/Carno.png';
import Table from '../../assets/Table.png';
import { useEffect, useState } from 'react';

interface IProps {
  what: string;
}

const SelectTrainerType = ({ what }: IProps) => {
  const [animation, setAnimation] = useState(false);
  useEffect(() => {
    console.log(what);
    setAnimation(true);
  }, []);
  return (
    <div className={styles.container}>
      <div
        className={`${styles.menu} ${animation ? styles.animation_end : styles.animation_start}`}
      >
        <div className={styles.title}>Выберите способ построения {what}:</div>
        <ol>
          <Link to="random">
            <li>
              <span>по автоматически генерируемым функциям</span>
            </li>
          </Link>
          <Link to="fromTeacher">
            <li>
              <span>по заранее построенным (преподавателем) функциям</span>
            </li>
          </Link>
        </ol>
      </div>
    </div>
    /*<Context.Provider value={{ persons: data }}>
      <BrowserRouter>
        
      </BrowserRouter>
    </Context.Provider>*/
  );
};

export default SelectTrainerType;
