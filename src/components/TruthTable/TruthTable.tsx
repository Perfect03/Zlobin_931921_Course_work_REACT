import getRandomArbitrary from '../../helpers/getRandomArbitrary';
import { TrainerType, XNode, Trainer } from '../../interfaces&types&consts/types';
import styles from './TruthTable.module.scss';
import mouse_left from '../../assets/mouse_left.png';
import mouse_right from '../../assets/mouse_right.png';
import reload from '../../assets/reload.png';
import { useEffect, useState } from 'react';
import {
  X,
  operators,
  answers,
  BooleanValuesOrder,
  KarnaughValuesOrder,
} from '../../interfaces&types&consts/consts';
import { useTranslation } from 'react-i18next';
import { CheckTreeAnswer, PrintFunction, generateWithTree } from '../../helpers/generateFunctions';
import { Tree } from '../../helpers/tree';

interface IProps {
  trainer: Trainer;
  type: TrainerType;
}

const TruthTable = ({ trainer, type }: IProps) => {
  const [vars, setVars] = useState(Number(localStorage.getItem('varsCount')) || 2);
  const [tree, setTree] = useState(
    new Tree(operators[Math.floor(Math.random() * operators.length)])
  );
  const [fn, setFn] = useState(
    type === 'static' ? getRandomArbitrary(1, 6) : ([] as (XNode | string)[])
  );
  const [result, setResult] = useState(-1);
  const [progress, setProgress] = useState([] as number[]);
  const { t } = useTranslation();

  useEffect(() => {
    if (type === 'auto') {
      const fn: (XNode | string)[] = [];
      generateWithTree(tree._root, 1, vars);
      PrintFunction(tree._root, fn);
      setFn(fn);
    }
  }, [tree]);

  const tableFillingInit = [];
  for (let i = 0; i < Math.pow(2, vars); i++) tableFillingInit.push(0);

  const [tableFilling, setTableFilling] = useState(tableFillingInit);

  function changeVars(n: number) {
    setVars(n);
    localStorage.setItem('varsCount', `${n}`);
    const newTableFilling = [];
    for (let i = 0; i < Math.pow(2, n); i++) newTableFilling.push(0);
    setTableFilling(newTableFilling);
    if (type === 'auto') setTree(new Tree(operators[Math.floor(Math.random() * operators.length)]));
  }

  function checkAnswer() {
    let count = 0;
    let progress = [];
    if (type == 'static') {
      const answKey = Object.keys(answers).findIndex((el) => el == `fn${vars}__${fn}`);
      const answValue = Object.values(answers)[answKey];
      for (let i = 0; i < answValue.length; i++)
        if (Number(answValue[i]) == tableFilling[i]) {
          count++;
          progress[i] = 1;
        } else progress[i] = 0;
    } else {
      const check = CheckTreeAnswer(
        tree._root,
        tableFilling,
        (trainer === 'Karnaugh' ? KarnaughValuesOrder : BooleanValuesOrder)[vars]
      );
      count = check.count;
      progress = check.progress;
    }
    setResult(Math.floor((count / tableFilling.length) * 100));
    setProgress(progress);
  }

  function reLoad() {
    const newTableFilling = [];
    for (let i = 0; i < tableFilling.length; i++) {
      newTableFilling[i] = 0;
    }
    setTableFilling(newTableFilling);
    setResult(-1);
    setProgress([]);
    if (type === 'auto') setTree(new Tree(operators[Math.floor(Math.random() * operators.length)]));
    else {
      let newFn = getRandomArbitrary(1, 6);
      while (fn == newFn) newFn = getRandomArbitrary(1, 6);
      setFn(newFn);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        {type === 'auto' ? (
          <div className={styles.functionRandom}>
            {(fn as (string | XNode)[])
              .slice(1, (fn as (string | XNode)[]).length - 1)
              .map((el, index) =>
                typeof el == 'string' ? (
                  <span key={index}>{el}</span>
                ) : (
                  <span key={index} style={{ textDecoration: `${el.bool ? '' : 'overline'}` }}>
                    {X[el.index - 1]}
                  </span>
                )
              )}
          </div>
        ) : (
          <img
            className={styles.functionImage}
            src={require(`../../assets/functions/${vars}/${fn}.png`)}
            alt=""
          />
        )}
        <button
          className={styles.reload}
          title={t('Change function') as string}
          onClick={() => reLoad()}
        >
          <img src={reload} height={35} alt="" />
        </button>
      </div>
      <div className={styles.bottom}>
        <div className={styles.vars}>
          <div className={styles.title}>{t('Number of variables')}</div>
          <div className={styles.bar}>
            <div
              className={`${styles.var} ${vars == 2 ? styles.active : ''}`}
              onClick={() => {
                if (vars != 2) changeVars(2);
              }}
            >
              2
            </div>
            <div
              className={`${styles.var} ${vars == 3 ? styles.active : ''}`}
              onClick={() => {
                if (vars != 3) changeVars(3);
              }}
            >
              3
            </div>
            <div
              className={`${styles.var} ${vars == 4 ? styles.active : ''}`}
              onClick={() => {
                if (vars != 4) changeVars(4);
              }}
            >
              4
            </div>
            <div
              className={`${styles.var} ${vars == 5 ? styles.active : ''}`}
              onClick={() => {
                if (vars != 5) changeVars(5);
              }}
            >
              5
            </div>
          </div>
        </div>
        {trainer == 'Karnaugh' ? (
          <div className={styles.Karnaugh}>
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
        ) : (
          <div className={styles.TruthTable} style={{ gridTemplateColumns: `${vars}fr 1fr` }}>
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
              {BooleanValuesOrder[vars].map((el, index) =>
                el.split('').map((elem, index) => (
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
                    newTable[index] = 1;
                    setTableFilling([...newTable]);
                  }}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    const newTable = tableFilling;
                    newTable[index] = 0;
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
        )}
        <div className={styles.buttons}>
          {trainer == 'Table' ? (
            <div className={styles.clicks}>
              <div className={styles.click}>
                <img src={mouse_left} height={46} alt="" /> <span>- {t('0 value')}</span>
              </div>
              <div className={styles.click}>
                <img src={mouse_right} height={46} alt="" /> <span>- {t('1 value')}</span>
              </div>
            </div>
          ) : (
            ''
          )}
          <button className={styles.enter} onClick={() => (result >= 0 ? reLoad() : checkAnswer())}>
            {t(result >= 0 ? 'Next' : 'Done')}
          </button>
          <div className={`${styles.result} ${result >= 0 ? styles.active : ''}`}>
            {result >= 0 ? `${t('Result')}: ${result}%` : ''}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TruthTable;
