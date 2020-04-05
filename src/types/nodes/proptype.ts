import { Node } from './baseNodes';

const typeString = 'PropTypeNode';

export interface PropTypeNode extends Node {
	name: string;
	jsDoc?: string;
	propType: Node;
	filenames: Set<string>;
}

export function propTypeNode(
	name: string,
	jsDoc: string | undefined,
	propType: Node,
	filenames: Set<string>
): PropTypeNode {
	return {
		type: typeString,
		name,
		jsDoc,
		propType,
		filenames,
	};
}

export function isPropTypeNode(node: Node): node is PropTypeNode {
	return node.type === typeString;
}
