import { Node } from '../nodes/baseNodes';

const typeString = 'UnionNode';

export interface UnionNode extends Node {
  types: Node[];
}

export function unionNode(types: Node[]): UnionNode {
  return {
    type: typeString,
    types: types,
  };
}

export function isUnionNode(node: Node): node is UnionNode {
  return node.type === typeString;
}
