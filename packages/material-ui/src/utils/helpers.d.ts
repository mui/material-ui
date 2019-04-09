export function capitalize(str: string): string;
export function contains<O1 extends O2, O2>(obj: O1, pred: O2): boolean;
export function createChainedFunction(...funcs: ChainedFunction[]): (...args: any[]) => never;

export type ChainedFunction = ((...args: any[]) => void) | undefined | null;
