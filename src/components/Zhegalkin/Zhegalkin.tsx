import { useTranslation } from 'react-i18next';
import { TrainerType, XNode } from '../../interfaces&types&consts/types';
import reload from '../../assets/reload.png';
import styles from './Zhegalkin.module.scss';
import { useEffect, useState } from 'react';

import getRandomArbitrary from '../../helpers/getRandomArbitrary';
import { X } from '../../interfaces&types&consts/consts';
import { generateDNF, ZhegalkinBuild } from '../../helpers/generateFunctions';

interface IProps {
  type: TrainerType;
}

interface IProgress {
  connunction: XNode | XNode[];
  answer: number[];
}

const Zhegalkin = ({ type }: IProps) => {
  const [vars, setVars] = useState(Number(localStorage.getItem('varsCount')) || 2);
  const [fn, setFn] = useState(type === 'static' ? getRandomArbitrary(1, 6) : ([] as XNode[][]));
  const [answer, setAnswer] = useState([] as (1 | XNode[])[]);
  const [result, setResult] = useState(-1);
  const [example, setExample] = useState(0);
  const [progress, setProgress] = useState([] as (IProgress | number)[]);

  const { t } = useTranslation();
  function changeVars(n: number) {
    setVars(n);
    localStorage.setItem('varsCount', `${n}`);
    reLoad();
  }

  useEffect(() => {
    setVars(Number(localStorage.getItem('varsCount')) || 2);
    console.log(vars);
    reLoad();
  }, []);

  function checkAnswer() {
    if (result >= 0) {
      reLoad();
    } else {
      let count = 0;
      let n = answer.length;
      let answ = answer;
      const boolNumber = answ.find((el) => typeof el == 'number');
      if (boolNumber) {
        if (progress.includes(1)) count++;
        answ = answ.filter((el) => typeof el != 'number');
      } else if (!progress.includes(1)) count++;
      else n++;
      console.log(count, answ);
      answ.forEach((el) => {
        const i = progress
          .filter((el) => typeof el != 'number')
          .findIndex(
            (elem) =>
              JSON.stringify((elem as IProgress).answer.sort((a, b) => a - b)) ==
              JSON.stringify((el as XNode[]).map((elem) => elem.index))
          );
        if (i >= 0) {
          count++;
          progress.splice(i, 1);
        }
      });
      setResult(Math.floor((count / answer.length) * 100));
    }
  }

  function inputAnswer(value: string, connunction: XNode | XNode[], index: number) {
    console.log(value);

    if (Number(value) >= 0 && Number(value) <= vars) {
      const newProgress = progress;
      console.log(newProgress);
      const connIndex = progress.findIndex((el) => (el as IProgress).connunction == connunction);
      if (connIndex >= 0) {
        if (value.length) (newProgress[connIndex] as IProgress).answer[index] = Number(value);
        else (newProgress[connIndex] as IProgress).answer[index] = -1;
      } else {
        const answer = [];
        if (value.length) answer[index] = Number(value);
        else answer[index] = -1;
        newProgress.push({ connunction: connunction, answer: answer });
      }
      setProgress(newProgress);
      console.log(newProgress);
    }
  }

  function inputBoolNumber(value: string) {
    if (Number(value) == 0 || Number(value) == 1) {
      const newProgress = progress;
      console.log(newProgress);
      const ind = progress.findIndex((el) => typeof el == 'number');
      if (ind < 0) newProgress.push(Number(value));
      else {
        if (value.length) newProgress[ind] = Number(value);
        else newProgress[ind] = 0;
      }
      console.log(newProgress);
    }
  }

  function reLoad() {
    setResult(-1);
    setExample(example + 1);
    if (type === 'auto') {
      const fn = generateDNF(vars);
      setFn(fn);
      console.log(fn);
      const answ = ZhegalkinBuild(fn as XNode[][]) as (1 | XNode[])[];
      setAnswer(answ);
      setProgress([]);
      console.log(answ);
    } else {
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
            {(fn as XNode[][]).map((elem, index) => (
              <>
                {index ? <> ∨ </> : ''}
                <div key={index} className={styles.connunction}>
                  {elem.map((el, index) => (
                    <span key={index} style={{ textDecoration: `${el.bool ? '' : 'overline'}` }}>
                      {X[el.index - 1]}
                    </span>
                  ))}{' '}
                </div>
              </>
            ))}
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
      <div className={styles.answer} key={example}>
        {answer
          .filter((el) => typeof el != 'number')
          .map((el, index) => (
            <div key={index} className={styles.connunction}>
              {(el as XNode[]).map((elem, ind) => (
                <div key={ind} className={styles.var}>
                  X
                  <input
                    type="text"
                    maxLength={1}
                    onChange={(e) =>
                      inputAnswer((e?.target as HTMLInputElement).value, el as XNode[], ind)
                    }
                  />
                </div>
              ))}
              <div className={styles.xor}>⊕</div>
            </div>
          ))}
        <div className={styles.number}>
          <input
            type="text"
            maxLength={1}
            onChange={(e) => inputBoolNumber((e?.target as HTMLInputElement).value)}
          />
        </div>
      </div>
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
  );
};

export default Zhegalkin;
