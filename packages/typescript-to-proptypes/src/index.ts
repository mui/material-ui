import * as ts from 'typescript';

export { default as loadConfig } from './loadConfig';
export * from './generator';
export * from './parser';
export * from './injector';
export * from './types';
export { ts };

export { getPropTypesFromFile } from './v2/getPropTypesFromFile';
export { injectPropTypesInFile } from './v2/injectPropTypesInFile';
export type { InjectPropTypesInFileOptions } from './v2/injectPropTypesInFile';
