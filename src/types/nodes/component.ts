import { Node, DefinitionHolder } from './baseNodes';
import { PropTypeNode } from './proptype';

const typeString = 'ComponentNode';

export interface ComponentNode extends DefinitionHolder {
  name: string;
}

export function componentNode(name: string, types?: PropTypeNode[]): ComponentNode {
  return {
    type: typeString,
    name: name,
    types: types || [],
  };
}

export function isComponentNode(node: Node): node is ComponentNode {
  return node.type === typeString;
}
