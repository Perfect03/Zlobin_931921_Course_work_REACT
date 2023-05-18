import { Operator } from '../interfaces&types&consts/types';

export class Node {
  constructor(data) {
    this.data = data;
    this.parent = null;
    this.left = null;
    this.right = null;
  }
}
export class Tree {
  constructor(data) {
    let node = new Node(data);
    this._root = node;
  }
  traverseDF(callback) {
    (function recurse(currentNode) {
      for (let i = 0, length = currentNode.children.length; i < length; i++) {
        recurse(currentNode.children[i]);
      }
      callback(currentNode);
    })(this._root);
  }
  contains(callback, traversal) {
    traversal.call(this, callback);
  }
  add(data, toData, traversal) {
    let child = new Node(data),
      parent = null,
      callback = function (node) {
        if (node.data === toData) {
          parent = node;
        }
      };
    this.contains(callback, traversal);
    if (parent) {
      parent.children.push(child);
      child.parent = parent;
    } else {
      throw new Error('Cannot add node to a non-existent parent.');
    }
  }
}
