import { operators } from '../interfaces&types&consts/consts';
import { XNode } from '../interfaces&types&consts/types';
import { Node } from './tree';

export function generateWithTree(node: Node, depth: number, vars: number) {
  if (Math.random() < 1 / Math.pow(2, depth)) {
    const newLeft = new Node(operators[Math.floor(Math.random() * operators.length)]);
    node.left = newLeft;
    newLeft.parent = node;
    generateWithTree(newLeft, depth + 1, vars);
  } else {
    const newLeft = new Node(formConunction(Math.floor(Math.random() * (vars - 1)) + 1, vars));
    node.left = newLeft;
    newLeft.parent = node;
  }

  if (Math.random() < 1 / Math.pow(2, depth)) {
    const newRight = new Node(operators[Math.floor(Math.random() * operators.length)]);
    node.right = newRight;
    newRight.parent = node;
    generateWithTree(newRight, depth + 1, vars);
  } else {
    const newRight = new Node(formConunction(Math.floor(Math.random() * (vars - 1)) + 1, vars));
    node.right = newRight;
    newRight.parent = node;
  }
}

function formConunction(i: number, vars: number) {
  const conunction: XNode[] = [];
  for (let j = 0; j < i; j++) {
    const a = Math.random();
    const b = Math.random() >= 1 / 2;
    let k = 1;
    while (a > k / vars) k++;
    conunction.some((el) => el.index === k)
      ? j--
      : conunction.push({
          index: k,
          bool: b,
        });
  }
  conunction.sort(function (a, b) {
    return a.index - b.index;
  });
  return conunction;
}

export function PrintFunction(node: Node, f: Array<string | XNode>) {
  f.push('(');
  node.left && Array.isArray(node.left.data)
    ? f.push(...node.left.data)
    : PrintFunction(node.left as Node, f);
  f.push(node.data as string);
  node.right && Array.isArray(node.right.data)
    ? f.push(...node.right.data)
    : PrintFunction(node.right as Node, f);
  f.push(')');
}

export function CheckTreeAnswer(root: Node, a: number[], vectors: string[]) {
  let count = 0;
  const progress = [];
  for (let i = 0; i < a.length; i++) {
    const vector = vectors[i];
    const t = getValue(root, vector);
    if (t == a[i]) {
      count++;
      progress[i] = 1;
    } else progress[i] = 0;
  }
  return {
    count: count,
    progress: progress,
  };
}

function getValue(node: Node, vector: string) {
  let left, right;
  if (node.left && Array.isArray(node.left.data)) {
    left = 1;
    node.left.data.forEach((el) => {
      if (Number(el.bool) != Number(vector[el.index - 1])) left = 0;
    });
  } else left = getValue(node.left as Node, vector);
  if (node.right && Array.isArray(node.right.data)) {
    right = 1;
    node.right.data.forEach((el) => {
      if (Number(el.bool) != Number(vector[el.index - 1])) right = 0;
    });
  } else right = getValue(node.right as Node, vector);
  let answ = 0;
  switch (node.data) {
    case '⊕':
      answ = left ^ right;
      break;
    case '∨':
      answ = left || right;
      break;
    case '∧':
      answ = left && right;
      break;
    case '~':
      answ = Number(left == right);
      break;
    case '←':
      answ = Number(!(!left && right));
      break;
    case '/':
      answ = Number(!left || !right);
      break;
    case '→':
      answ = Number(!(left && !right));
      break;
    case '↓':
      answ = Number(!left && !right);
      break;
  }
  return answ;
}

export function generateDNF(vars: number) {
  const connunctions = [];
  const r = Math.random();
  for (let count = 0; count / 10 < r; count += 2) {
    connunctions.push(formConunction(Math.floor(Math.random() * (vars - 1)) + 1, vars));
  }
  return connunctions;
}

export function ZhegalkinBuild(connunctions: XNode[][]) {
  let newConnunctions: (XNode | 1 | XNode[])[][][] = [];
  let i = 0;
  for (i = 0; i < connunctions.length - 1; i += 2)
    newConnunctions.push([connunctions[i], connunctions[i + 1]]);
  if (i == connunctions.length - 1) newConnunctions.push([connunctions[i]]);
  console.log(newConnunctions.slice());

  newConnunctions.forEach((el, index) => {
    if (el[1]) {
      let ortog = false;
      el[0].forEach((el1) => {
        if (el[1])
          el[1].forEach((el2) => {
            if (
              (el1 as XNode).index == (el2 as XNode).index &&
              (el1 as XNode).bool != (el2 as XNode).bool
            )
              ortog = true;
          });
      });
      const brackets = [el[0]];
      if (el[1]) brackets.push(el[1]);
      if (!ortog) {
        const elem = [...el[0]];
        if (el[1]) elem.push(...el[1]);
        brackets.push(
          elem
            .filter(
              (x, i) => elem.findIndex((el) => (el as XNode).index == (x as XNode).index) == i
            )
            .sort((a, b) => (a as XNode).index - (b as XNode).index)
        );
      }
      newConnunctions[index] = brackets;
    }
  });
  console.log(newConnunctions.slice());

  while (newConnunctions.length > 1) {
    const newNewConnunctions = [];
    for (let i = 0; i < newConnunctions.length - 1; i += 2) {
      const brackets = [];
      brackets.push(...newConnunctions[i], ...newConnunctions[i + 1]);
      newConnunctions[i].forEach((arr1) => {
        (newConnunctions as XNode[][][])[i + 1].forEach((arr2) => {
          let ortog = false;
          arr1.forEach((el1) => {
            arr2.forEach((el2) => {
              if ((el1 as XNode).index == el2.index && (el1 as XNode).bool != el2.bool)
                ortog = true;
            });
          });
          if (!ortog) {
            const newBrackets = [...arr1, ...arr2];
            brackets.push(
              [...arr1, ...arr2]
                .filter(
                  (el, index) =>
                    newBrackets.findIndex((elem) => (el as XNode).index == (elem as XNode).index) ==
                    index
                )
                .sort((a, b) => (a as XNode).index - (b as XNode).index)
            );
          }
        });
      });
      newNewConnunctions.push(brackets);
    }
    newConnunctions = newNewConnunctions;
  }
  console.log(newConnunctions.slice());

  const newNewNewConnunctions: (XNode | 1 | XNode[])[][] = [];
  newConnunctions[0].forEach((el, index) => {
    newNewNewConnunctions.push(...deleteInverse(el, []));
  });
  let answ: (XNode | 1 | XNode[])[] = [];
  newNewNewConnunctions.forEach((el) => {
    answ.push(...el);
  });
  console.log(answ.slice());
  answ = answ.filter(
    (el, index) =>
      answ.findIndex((elem) => JSON.stringify(el) == JSON.stringify(elem)) == index || el == 1
  );
  answ.map((el, index) => {
    if ((el as XNode).index) answ[index] = [el as XNode];
  });
  const ones = answ.filter((el) => el == 1);
  if (ones.length > 1) {
    answ = answ.filter((el) => el != 1);
    if (ones.length % 2) answ.push(1);
  }
  return answ;
}

function deleteInverse(a: (XNode | 1 | XNode[])[], c: (XNode | 1 | XNode[])[][]) {
  const b = a;
  a.forEach((el, index) => {
    c.push((el as XNode).bool ? [el] : [1, { index: (el as XNode).index, bool: true }]);
  });
  console.log(c.slice());
  return openBrackets(c);
}

function openBrackets(a: (XNode | 1 | XNode[])[][]) {
  while (a.length > 1) {
    const newBrackets: (1 | XNode | XNode[])[] = [];
    console.log(a[0]);
    console.log(a[1]);
    a[0].forEach((el1) => {
      a[1].forEach((el2) => {
        if (el1 == 1) {
          if (el2 == 1) newBrackets.push(1);
          else newBrackets.push(el2);
        } else if (el2 == 1) newBrackets.push(el1);
        else {
          const n = [];
          if (Array.isArray(el1)) n.push(...el1);
          else n.push(el1);
          if (Array.isArray(el2)) n.push(...el2);
          else n.push(el2);
          newBrackets.push(n);
        }
      });
    });
    console.log(newBrackets);
    a[0] = newBrackets;
    console.log(a[0]);
    a.splice(1, 1);
  }
  return a;
}
