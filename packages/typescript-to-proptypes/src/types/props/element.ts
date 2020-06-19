import { Node } from '../nodes/baseNodes';

const typeString = 'ElementNode';
type ElementType = 'element' | 'node' | 'elementType';

interface ElementNode extends Node {
  elementType: ElementType;
}

export function elementNode(elementType: ElementType): ElementNode {
  return {
    type: typeString,
    elementType,
  };
}

export function isElementNode(node: Node): node is ElementNode {
  return node.type === typeString;
}
