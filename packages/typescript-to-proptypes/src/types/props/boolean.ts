import { Node } from '../nodes/baseNodes';

const typeString = 'BooleanNode';

export function booleanNode(): Node {
	return {
		type: typeString,
	};
}

export function isBooleanNode(node: Node) {
	return node.type === typeString;
}
