import { Node } from './baseNodes';

const typeString = 'PropTypeNode';

export interface PropTypeNode extends Node {
  name: string;
  jsDoc?: string;
  propType: Node;
}

export function propTypeNode(
  name: string,
  jsDoc: string | undefined,
  propType: Node,
): PropTypeNode {
  return {
    type: typeString,
    name,
    jsDoc,
    propType,
  };
}

export function isPropTypeNode(node: Node): node is PropTypeNode {
  return node.type === typeString;
}
