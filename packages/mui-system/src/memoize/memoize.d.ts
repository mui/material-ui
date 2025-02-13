export default function memoize<ArgType = any, ReturnType = any>(
  fn: (arg: ArgType) => ReturnType,
): (arg: ArgType) => ReturnType;
