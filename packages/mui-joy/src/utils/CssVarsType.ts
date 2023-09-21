export type CssVarsValuesType<Keys extends string, Component extends string> = Partial<
  Record<`--${Component}-${Keys}`, string | number>
>;
