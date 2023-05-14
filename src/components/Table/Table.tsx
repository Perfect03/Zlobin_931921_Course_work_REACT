import { TrainerType } from '../../interfaces&types/types';
import styles from './Table.module.scss';

interface IProps {
  type: TrainerType;
}

const Table = ({ type }: IProps) => {
  return (
    <div className={styles.container}></div>
    /*<Context.Provider value={{ persons: data }}>
      <BrowserRouter>
        
      </BrowserRouter>
    </Context.Provider>*/
  );
};

export default Table;
