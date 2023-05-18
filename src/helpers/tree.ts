import { Operator } from '../interfaces&types&consts/types';
import { XNode } from '../interfaces&types&consts/types';

export class Node {
  data: Operator | Array<XNode>;
  parent: Node | null;
  left: Node | null;
  right: Node | null;
  constructor(data: Operator | Array<XNode>) {
    this.data = data;
    this.parent = null;
    this.left = null;
    this.right = null;
  }
}
export class Tree {
  _root: Node;
  constructor(data: Operator | Array<XNode>) {
    const node = new Node(data);
    this._root = node;
  }
}
