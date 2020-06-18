import { PropTypeNode } from './proptype';

export interface Node {
	type: string;
}

export interface DefinitionHolder extends Node {
	types: PropTypeNode[];
}
