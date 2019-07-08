import { Node } from './baseNodes';
import { ComponentNode } from './component';

const typeString = 'ProgramNode';

export interface ProgramNode extends Node {
  body: ComponentNode[];
}

export function programNode(body?: ComponentNode[]): ProgramNode {
  return {
    type: typeString,
    body: body || [],
  };
}

export function isProgramNode(node: Node): node is ProgramNode {
  return node.type === typeString;
}
