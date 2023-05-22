import { operators } from '../interfaces&types&consts/consts';
import { XNode } from '../interfaces&types&consts/types';
import { Node } from './tree';

/*export function Generate(v, vars) {
  const probabilities = [];
  for (let i = 0, p = 1 / 2; i < vars; i++, p /= 2) {
    probabilities.push(p);
  }
  probabilities[vars - 1] *= 2;
  generateVar(0, v, vars);
  Fill(v, vars, probabilities);
  return v;
}

export function Fill(a, vars, probabilities) {
  console.log(a);
  fillArray(a, vars);
  Operators(a);
  return a;
}

function generateVar(depth, v, vars) {
  let r = Math.random();
  console.log(r);
  if (r < 1 / Math.pow(2, depth)) {
    console.log(depth);
    const temp = [];
    const temp2 = [];
    generateVar(depth + 1, temp, vars);
    generateVar(depth + 1, temp2, vars);
    v.push(temp);
    v.push(temp2);
  } else {
    r = Math.random();
    for (let i = 0; i / vars <= r; i++) {
      v.push([]);
    }
  }
  // let p = probabilities[0];
  // while (r>p) {
  // count++;
  // p+=probabilities[count - (depth ? 0 : 2)];
  // }
  // for (let i=0; i<count; i++) {f
  // const expr = [];
  // generateVar(depth+1, expr, vars);
  // v.push(expr);
  // }
}

function fillArray(a, vars) {
  console.log(a.length);
  a.forEach((el, index) => {
    if (el.every((elem) => !elem.length)) {
      a[index] = formConunction(el.length, vars);
    }
    // else el.forEach(elem => {
    //   fillArray(elem, vars);
    // });
    else fillArray(el, vars);
  });
  // if(a.every(el => !el.length)) {console.log(a);
  //   return formConunction(a.length, vars);
  //console.log(a);
  // const r = Math.random();
  // let p = 0;
  // for (let i=0; i<probabilities.length; i++) {
  //   p+=probabilities[i];
  //   if (r<p) {
  //     a=formConunction(i+1, vars);
  //     console.log(a);
  //     //console.log(i+1);
  //     break;
  //   }
  // }
  // }
  //     else a.forEach(el => {
  //     a = fillArray(el, vars);
  //   });
  // console.log(a);
}

function Operators(a) {
  a.forEach((el, index) => {
    //if(el.isArray() )
  });
}
*/
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
  const conunctions = [];
  const r = Math.random();
  for (let count = 1; count / 10 < r; count++) {
    conunctions.push(formConunction(Math.floor(Math.random() * (vars - 1)) + 1, vars));
  }

  const newConnunctions = [];
  for (let i = 0; i < conunctions.length; i += 2) {
    const brackets = [conunctions[i]];
    if (i < conunctions.length - 1) brackets.push(conunctions[i + 1]);
    newConnunctions.push(brackets);
  }
  console.log(newConnunctions);

  const Zheg = [];
  newConnunctions.forEach((el, index) => {
    if (el[1]) {
      let ortog = false;
      el[0].forEach((el1) => {
        if (el[1])
          el[1].forEach((el2) => {
            if (el1.index == el2.index && el1.bool != el2.bool) ortog = true;
          });
      });
      const brackets = [el[0]];
      if (el[1]) brackets.push(el[1]);
      if (!ortog) {
        const elem = [...el[0]];
        if (el[1]) elem.push(...el[1]);
        brackets.push(elem.filter((x, i) => elem.findIndex((el) => el.index == x.index) == i));
      }
      newConnunctions[index] = brackets;
    }
  });
  console.log(newConnunctions);

  for (let i = 0; i < newConnunctions.length - 1; i++) {
    const brackets = [];
    brackets.push(...newConnunctions[i], ...newConnunctions[i + 1]);
    const merge = [];
  }
}
