import { useTranslation } from 'react-i18next';
import { TrainerType } from '../../interfaces&types&consts/types';
import styles from './Table.module.scss';
import { useState } from 'react';

import getRandomArbitrary from '../../helpers/getRandomArbitrary';
import { X, operators, answers } from '../../interfaces&types&consts/consts';

interface IProps {
  type: TrainerType;
}

const Table = ({ type }: IProps) => {
  const [vars, setVars] = useState(Number(localStorage.getItem('varsCount')) || 2);
  const [fn, setFn] = useState(getRandomArbitrary(1, 6));
  const [result, setResult] = useState(-1);
  const [progress, setProgress] = useState([] as number[]);
  const tableFillingInit = [];
  for (let i = 0; i < Math.pow(2, vars); i++) tableFillingInit.push('');
  const [tableFilling, setTableFilling] = useState(tableFillingInit);

  const { t } = useTranslation();
  function changeVars(n: number) {
    setVars(n);
    localStorage.setItem('varsCount', `${n}`);
    const newTableFilling = [];
    for (let i = 0; i < Math.pow(2, n); i++) newTableFilling.push('');
    setTableFilling(newTableFilling);
  }

  const bools = Array(vars);
  const booleanVectors: [number[]] = [[]];

  function generateBooleanVectors(i: number) {
    for (let k = 0; k < 2; k++) {
      bools[i] = k;
      i == vars - 1 ? booleanVectors.push([...bools]) : generateBooleanVectors(i + 1);
    }
    return booleanVectors;
  }

  function checkAnswer() {
    if (result >= 0) {
      const newTableFilling = [];
      for (let i = 0; i < tableFilling.length; i++) {
        newTableFilling[i] = '';
      }
      setTableFilling(newTableFilling);
      setResult(-1);
      setProgress([]);
      let newFn = getRandomArbitrary(1, 6);
      while (fn == newFn) newFn = getRandomArbitrary(1, 6);
      setFn(newFn);
    } else {
      const answKey = Object.keys(answers).findIndex((el) => el == `fn${vars}__${fn}`);
      const answValue = Object.values(answers)[answKey];
      let count = 0;
      const progress = [];
      for (let i = 0; i < answValue.length; i++)
        if (answValue[i] == tableFilling[i]) {
          count++;
          progress[i] = 1;
        } else progress[i] = 0;
      setResult(Math.floor((count / answValue.length) * 100));
      setProgress(progress);
    }
  }

  return (
    <div className={styles.container}>
      <img
        className={styles.function}
        src={require(`../../assets/functions/${vars}/${fn}.png`)}
        alt=""
      />
      <div className={styles.bottom}>
        <div className={styles.vars}>
          <div className={styles.title}>{t('Number of variables')}</div>
          <div className={styles.bar}>
            <div
              className={`${styles.var} ${vars == 2 ? styles.active : ''}`}
              onClick={() => changeVars(2)}
            >
              2
            </div>
            <div
              className={`${styles.var} ${vars == 3 ? styles.active : ''}`}
              onClick={() => changeVars(3)}
            >
              3
            </div>
            <div
              className={`${styles.var} ${vars == 4 ? styles.active : ''}`}
              onClick={() => changeVars(4)}
            >
              4
            </div>
            <div
              className={`${styles.var} ${vars == 5 ? styles.active : ''}`}
              onClick={() => changeVars(5)}
            >
              5
            </div>
          </div>
        </div>
        <div className={styles.table__container} style={{ gridTemplateColumns: `${vars}fr 1fr` }}>
          <div
            className={styles.tableVars}
            style={{ gridTemplateColumns: `repeat(${vars + 1}, 1fr)` }}
          >
            {[...Array(vars)].map((el, index) => (
              <div key={index} className={styles.section}>
                {X[index]}
              </div>
            ))}
            <div className={styles.section}>f(x)</div>
          </div>
          <div
            className={styles.table}
            style={{
              gridTemplateColumns: `repeat(${vars}, 1fr`,
            }}
          >
            {generateBooleanVectors(0).map((el, index) =>
              el.map((elem, index) => (
                <div key={index} className={styles.section}>
                  {elem}
                </div>
              ))
            )}
          </div>
          <div className={styles.tableAnswers} style={{ gridTemplateColumns: '1fr' }}>
            {tableFilling.map((el, index) => (
              <div
                key={index}
                className={styles.section}
                onClick={() => {
                  const newTable = tableFilling;
                  newTable[index] = '1';
                  setTableFilling([...newTable]);
                }}
                onContextMenu={(e) => {
                  e.preventDefault();
                  const newTable = tableFilling;
                  newTable[index] = '0';
                  setTableFilling([...newTable]);
                }}
              >
                <div
                  className={`${styles.progress} ${
                    result >= 0 ? (progress[index] ? styles.correct : styles.incorrect) : ''
                  }`}
                >
                  {el}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.buttons}>
          <button className={styles.enter} onClick={() => checkAnswer()}>
            {t(result >= 0 ? 'Next' : 'Done')}
          </button>
          <div className={`${styles.result} ${result >= 0 ? styles.active : ''}`}>
            {result >= 0 ? `${t('Result')}: ${result}%` : ''}
          </div>
        </div>
      </div>
    </div>
    /*<Context.Provider value={{ persons: data }}>
      <BrowserRouter>
        
      </BrowserRouter>
    </Context.Provider>*/
  );
};

export default Table;
