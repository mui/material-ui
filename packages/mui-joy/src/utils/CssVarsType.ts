/**
 * A type which generates CSS Variables.
 * @example
 * type ButtonCssVars = CssVarsType<'color' | 'size', 'Button'>;
 *  ButtonCssVars = {
 * '--Button-color'?: string | number;
 * '--Button-size'?: string | number;
 * }
 */
export type CssVarsType<Keys extends string, Component extends string> = Partial<
  Record<`--${Component}-${Keys}`, string | number>
>;
