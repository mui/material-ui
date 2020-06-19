import { Node } from '../nodes/baseNodes';

const typeString = 'LiteralNode';

export interface LiteralNode extends Node {
  value: unknown;
  jsDoc?: string;
}

export function literalNode(value: unknown, jsDoc?: string): LiteralNode {
  return {
    type: typeString,
    value,
    jsDoc,
  };
}

export function isLiteralNode(node: Node): node is LiteralNode {
  return node.type === typeString;
}
