import { Node } from '../nodes/baseNodes';

const typeString = 'ArrayNode';

export interface ArrayNode extends Node {
	arrayType: Node;
}

export function arrayNode(arrayType: Node): ArrayNode {
	return {
		type: typeString,
		arrayType,
	};
}

export function isArrayNode(node: Node): node is ArrayNode {
	return node.type === typeString;
}
