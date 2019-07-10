import { Node } from '../nodes/baseNodes';

const typeString = 'UnionNode';

export interface UnionNode extends Node {
  types: Node[];
}

export function unionNode(types: Node[]): UnionNode {
  const flatTypes: Node[] = [];

  flattenTypes(types);

  function flattenTypes(nodes: Node[]) {
    nodes.forEach(x => {
      if (isUnionNode(x)) {
        flattenTypes(x.types);
      } else {
        flatTypes.push(x);
      }
    });
  }

  return {
    type: typeString,
    types: flatTypes,
  };
}

export function isUnionNode(node: Node): node is UnionNode {
  return node.type === typeString;
}
