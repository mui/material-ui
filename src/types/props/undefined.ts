import { Node } from '../nodes/baseNodes';

const typeString = 'UndefinedNode';

export function undefinedNode(): Node {
	return {
		type: typeString,
	};
}

export function isUndefinedNode(node: Node) {
	return node.type === typeString;
}
