import { Node, DefinitionHolder, PropTypeNode } from './baseNodes';

const typeString = 'ComponentNode';

export interface ComponentNode extends DefinitionHolder {
  name: string;
  propsFilename?: string;
}

export function componentNode(
  name: string,
  types: PropTypeNode[],
  propsFilename: string | undefined,
): ComponentNode {
  return {
    type: typeString,
    name,
    types: types || [],
    propsFilename,
  };
}

export function isComponentNode(node: Node): node is ComponentNode {
  return node.type === typeString;
}
