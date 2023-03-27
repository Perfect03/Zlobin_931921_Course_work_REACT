import { useParams } from 'react-router-dom';
import { TrainerType } from '../../interfaces&types/types';
import styles from './Carno.module.scss';

const Carno = () => {

  const {id} = useParams();
  console.log(id);
  return (<div className={styles.container}>
    
  </div>
    /*<Context.Provider value={{ persons: data }}>
      <BrowserRouter>
        
      </BrowserRouter>
    </Context.Provider>*/
  );
};

export default Carno;
