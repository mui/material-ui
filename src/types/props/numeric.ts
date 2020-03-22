import { Node } from '../nodes/baseNodes';

const typeString = 'NumericNode';

export function numericNode(): Node {
	return {
		type: typeString,
	};
}

export function isNumericNode(node: Node) {
	return node.type === typeString;
}
