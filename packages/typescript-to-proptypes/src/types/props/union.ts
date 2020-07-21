import _ from 'lodash';
import { isInstanceOfNode } from './instanceOf';
import { isLiteralNode } from './literal';
import { Node } from '../nodes/baseNodes';

const typeString = 'UnionNode';

export interface UnionNode extends Node {
  types: Node[];
}

export function isUnionNode(node: Node): node is UnionNode {
  return node.type === typeString;
}

export function uniqueUnionTypes(node: UnionNode): UnionNode {
  return {
    type: node.type,
    types: _.uniqBy(node.types, (x) => {
      if (isLiteralNode(x)) {
        return x.value;
      }

      if (isInstanceOfNode(x)) {
        return `${x.type}.${x.instance}`;
      }

      return x.type;
    }),
  };
}

export function unionNode(types: Node[]): UnionNode {
  const flatTypes: Node[] = [];

  function flattenTypes(nodes: Node[]) {
    nodes.forEach((x) => {
      if (isUnionNode(x)) {
        flattenTypes(x.types);
      } else {
        flatTypes.push(x);
      }
    });
  }

  flattenTypes(types);

  return uniqueUnionTypes({
    type: typeString,
    types: flatTypes,
  });
}
