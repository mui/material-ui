export function capitalize(str: string): string;
export function contains<O1 extends O2, O2>(obj: O1, pred: O2): boolean;
export function findIndex(arr: any[], pred: any): number;
export function find<T>(arr: T[], pred: any): T;
export function createChainedFunction(...funcs: ChainedFunction[]): (...args: any[]) => never;

export type ChainedFunction = ((...args: any[]) => void) | undefined | null;
