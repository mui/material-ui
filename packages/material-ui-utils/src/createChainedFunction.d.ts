export type ChainedFunction = ((...args: any[]) => void) | undefined | null;

export default function createChainedFunction(
  ...funcs: ChainedFunction[]
): (...args: any[]) => never;
