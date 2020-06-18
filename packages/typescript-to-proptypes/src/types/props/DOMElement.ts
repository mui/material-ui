import { Node } from '../nodes/baseNodes';

const typeString = 'DOMElementNode';

interface DOMElementNode extends Node {
	optional?: boolean;
}

export function DOMElementNode(optional?: boolean): DOMElementNode {
	return {
		type: typeString,
		optional,
	};
}

export function isDOMElementNode(node: Node): node is DOMElementNode {
	return node.type === typeString;
}
