import { Node } from '../nodes/baseNodes';

const typeString = 'LiteralNode';

export interface LiteralNode extends Node {
	value: any;
	jsDoc?: string;
}

export function literalNode(value: any, jsDoc?: string): LiteralNode {
	return {
		type: typeString,
		value,
		jsDoc,
	};
}

export function isLiteralNode(node: Node): node is LiteralNode {
	return node.type === typeString;
}
