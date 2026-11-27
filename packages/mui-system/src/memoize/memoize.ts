export default function memoize<ArgType extends keyof any = any, ReturnType = any>(
  fn: (arg: ArgType) => ReturnType,
): (arg: ArgType) => ReturnType {
  const cache: Record<string, ReturnType> = Object.create(null);

  return (arg: ArgType) => {
    if (cache[arg as any] === undefined) {
      cache[arg as any] = fn(arg);
    }

    return cache[arg as any];
  };
}
