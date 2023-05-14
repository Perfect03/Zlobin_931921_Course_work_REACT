import { useParams } from 'react-router-dom';
import getRandomArbitrary from '../../helpers/getRandomArbitrary';
import { TrainerType } from '../../interfaces&types/types';
import styles from './Carno.module.scss';
import { useEffect, useState } from 'react';

const answers = {
  fn2__1: '1111',
  fn2__2: '0010',
  fn2__3: '1111',
  fn2__4: '0011',
  fn2__5: '1001',
  fn2__6: '1001',

  fn3__1: '11111010',
  fn3__2: '00101111',
  fn3__3: '11111111',
  fn3__4: '00000010',
  fn3__5: '00111110',
  fn3__6: '00101010',

  fn4__1: '0000100011000000',
  fn4__2: '1111111111111111',
  fn4__3: '1100111011011101',
  fn4__4: '0000111111111111',
  fn4__5: '0000000011001100',
  fn4__6: '0000111011101111',

  fn5__1: '00100100001011000000010000100100',
  fn5__2: '10011001100111011001100110011001',
  fn5__3: '00100011000000110000001100000011',
  fn5__4: '00000110000001110000011000000110',
  fn5__5: '00000000000000000000000000000000',
  fn5__6: '01100000011111000110000001100000',
};

interface IProps {
  type: TrainerType;
}

const Carno = ({ type }: IProps) => {
  const [vars, setVars] = useState(Number(localStorage.getItem('varsCount')) || 2);
  const [fn, setFn] = useState(getRandomArbitrary(1, 6));
  const [result, setResult] = useState(-1);
  const [progress, setProgress] = useState([] as number[]);

  const tableFillingInit = [];
  for (let i = 0; i < Math.pow(2, vars); i++) tableFillingInit.push(0);

  const [tableFilling, setTableFilling] = useState(tableFillingInit);

  function changeVars(n: number) {
    setVars(n);
    localStorage.setItem('varsCount', `${n}`);
    const newTableFilling = [];
    for (let i = 0; i < Math.pow(2, n); i++) newTableFilling.push(0);
    setTableFilling(newTableFilling);
  }

  function checkAnswer() {
    if (result >= 0) {
      const newTableFilling = [];
      for (let i = 0; i < tableFilling.length; i++) {
        newTableFilling[i] = 0;
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
        if (Number(answValue[i]) == tableFilling[i]) {
          count++;
          progress[i] = 1;
        } else progress[i] = 0;
      setResult(Math.floor((count / answValue.length) * 100));
      setProgress(progress);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.vars}>
        <div className={styles.title}>Количество переменных:</div>
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
      <img
        className={styles.function}
        src={require(`../../assets/functions/${vars}/${fn}.png`)}
        alt=""
      />
      <div className={styles.left_flex}>
        <div className={styles.table_container}>
          <div className={styles.table_grid}>
            <div className={styles.lines_top_left}></div>
            <div className={styles.lines_top_main}>
              <div id={styles.x5} className={`${styles.flex} ${vars > 4 ? styles.active : ''}`}>
                <hr />
                <hr className={styles.x5__secondLine} />
                <div className={styles.lines_top_x}>x₅</div>
              </div>
              <div id={styles.x3} className={`${styles.flex} ${vars > 2 ? styles.active : ''}`}>
                <hr />
                <div className={styles.lines_top_x}>x₃</div>
              </div>
              <div id={styles.x1} className={`${styles.flex} ${vars > 0 ? styles.active : ''}`}>
                <hr />
                <div className={styles.lines_top_x}>x₁</div>
              </div>
            </div>

            <div
              className={styles.table}
              style={{
                gridTemplateColumns: `repeat(${Math.pow(
                  2,
                  Math.floor(vars / 2) + (vars % 2)
                )}, 1fr`,
              }}
            >
              {tableFilling.map((el, index) => (
                <div
                  key={index}
                  className={styles.section}
                  onClick={() => {
                    const newTable = tableFilling;
                    newTable[index] = 1 - tableFilling[index];
                    console.log(newTable[index]);
                    setTableFilling([...newTable]);
                  }}
                >
                  <div
                    className={`${styles.progress} ${
                      result >= 0 ? (progress[index] ? styles.correct : styles.incorrect) : ''
                    }`}
                  >
                    <div className={styles.circle} style={{ opacity: el }}></div>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.lines_left}>
              <div
                id={styles.x4}
                className={`${styles.flex_column} ${vars > 3 ? styles.active : ''}`}
              >
                <div className={styles.lines_left_x}>x₄</div>
                <hr />
              </div>
              <div
                id={styles.x2}
                className={`${styles.flex_column} ${vars > 1 ? styles.active : ''}`}
              >
                <div className={styles.lines_left_x}>x₂</div>
                <hr />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.buttons}>
          <button className={styles.enter} onClick={() => checkAnswer()}>
            {result >= 0 ? 'Далее' : 'Готово'}
          </button>
          <div className={`${styles.result} ${result >= 0 ? styles.active : ''}`}>
            {result >= 0 ? `Результат: ${result}%` : ''}
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

export default Carno;
