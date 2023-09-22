/**
 * A type which generates CSS Variables.
 * @example
 * type ButtonCssVars = GenerateCssVarsType<'color' | 'size', 'Button'>;
 *  ButtonCssVars wouldb be {
 * '--Button-color'?: string | number;
 * '--Button-size'?: string | number;
 * }
 */
export type GenerateCssVarsType<Keys extends string, Component extends string> = Partial<
  Record<`--${Component}-${Keys}`, string | number>
>;
