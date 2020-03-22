import { Node } from '../nodes/baseNodes';

const typeString = 'AnyNode';

export function anyNode(): Node {
	return {
		type: typeString,
	};
}

export function isAnyNode(node: Node) {
	return node.type === typeString;
}
