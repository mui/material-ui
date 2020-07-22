import { Node, DefinitionHolder, PropTypeNode } from '../nodes/baseNodes';

const typeString = 'InterfaceNode';

export interface InterfaceNode extends DefinitionHolder {}

export function interfaceNode(types?: PropTypeNode[]): InterfaceNode {
  return {
    type: typeString,
    types: types || [],
  };
}

export function isInterfaceNode(node: Node): node is InterfaceNode {
  return node.type === typeString;
}
