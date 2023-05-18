import { operators, CarnoValuesOrder } from '../interfaces&types&consts/consts';
import { Tree, Node } from './tree';

export class Variable {
  constructor(index, bool) {
    this.index = index;
    this.bool = bool;
    this.left = null;
    this.right = null;
  }
}

export function Generate(v, vars) {
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

function formConunction(i, vars) {
  const conunction = [];
  for (let j = 0; j < i; j++) {
    const a = Math.random();
    const b = Math.random() >= 1 / 2;
    let k = 1;
    //console.log(a, k, vars);
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

function Operators(a) {
  a.forEach((el, index) => {
    //if(el.isArray() )
  });
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export function generateWithTree(node, depth, vars) {
  //tree.add('VP of Happiness', 'CEO', tree.traverseDF);

  //if(operators.includes(node.data)) {
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
  //}

  //   let r = Math.random();
  // console.log(r);
  // if (r < 1/Math.pow(2, depth)) {
  //   console.log(depth);

  //   const temp = [];
  //   const temp2 = [];
  //   generateVar(depth+1, temp, vars);
  //   generateVar(depth+1, temp2, vars);
  //   v.push(temp);
  //   v.push(temp2);
  // }
  // else {
  //   r = Math.random();
  //   for (let i=0; i/vars<=r; i++) {
  //     v.push([]);
  //   }
  // }
}

export function PrintFunction(node, f) {
  f.push('(');
  Array.isArray(node.left.data) ? f.push(...node.left.data) : PrintFunction(node.left, f);
  f.push(node.data);
  Array.isArray(node.right.data) ? f.push(...node.right.data) : PrintFunction(node.right, f);
  f.push(')');
}

export function CheckTreeAnswer(root, a, vars) {
  let count = 0;
  for (let i=0; i<a.length; i++) {
    const vector = CarnoValuesOrder[vars][i];
    console.log(vector);
    const t = getValue(root, vector);
    console.log(t, a[i]);
    if(t == a[i]) count++;
    console.log(count);
  }
  return count;
}

function getValue(node, vector) {
  let left, right;
  console.log(node);
  if (Array.isArray(node.left.data)) {
    left = 1;
    node.left.data.forEach(el => {
      if(Number(el.bool) != vector[el.index-1]) left = 0;
    })
  }
  else left = getValue(node.left, vector);
  if (Array.isArray(node.right.data)) {
    right = 1;
    node.right.data.forEach(el => {
      if(Number(el.bool) != vector[el.index+1]) right = 0;
    })
  }
  else right = getValue(node.right, vector);
  let answ = 0;
  switch (node.data) {
    case '⊕':
      answ = left ^ right;
    case '∨':
      answ = left || right;
    case '∧':
      answ = left && right;
    case '~':
      answ = left == right;
    case '←':
      answ = !(!left && right);
    case '∕':
      answ = !left || !right;
    case '→':
      answ = !(left && !right);
    case '↓':
      answ = !left && !right;
  }
  return answ;
}

function arrMergeRecursive(arr) {
  let temp = [];
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    item.isArray() ? (temp = temp.concat(arrMergeRecursive(item))) : temp.push(item);
  }
  return temp;
}
