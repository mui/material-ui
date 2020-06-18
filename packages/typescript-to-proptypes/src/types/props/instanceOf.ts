import { Node } from '../nodes/baseNodes';

const typeString = 'InstanceOfNode';

export interface InstanceOfNode extends Node {
	instance: string;
}

export function instanceOfNode(instance: string): InstanceOfNode {
	return {
		type: typeString,
		instance,
	};
}

export function isInstanceOfNode(node: Node): node is InstanceOfNode {
	return node.type === typeString;
}
