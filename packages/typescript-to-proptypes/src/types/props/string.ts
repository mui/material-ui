import { Node } from '../nodes/baseNodes';

const typeString = 'StringNode';

export function stringNode(): Node {
	return {
		type: typeString,
	};
}

export function isStringNode(node: Node) {
	return node.type === typeString;
}
