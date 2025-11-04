export default function memoize<ArgType = any, ReturnType = any>(
  fn: (arg: ArgType) => ReturnType,
): (arg: ArgType) => ReturnType {
  const cache: Record<string, ReturnType> = {};

  return (arg: ArgType): ReturnType => {
    if (cache[arg as any] === undefined) {
      cache[arg as any] = fn(arg);
    }

    return cache[arg as any];
  };
}
