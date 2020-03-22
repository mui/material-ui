import { Node } from '../nodes/baseNodes';

const typeString = 'FunctionNode';

export function functionNode(): Node {
	return {
		type: typeString,
	};
}

export function isFunctionNode(node: Node) {
	return node.type === typeString;
}
