import { Node } from '../nodes/baseNodes';

const typeString = 'ObjectNode';

export function objectNode(): Node {
  return {
    type: typeString,
  };
}

export function isObjectNode(node: Node) {
  return node.type === typeString;
}
