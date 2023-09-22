/**
 * A type which generates CSS Variables.
 * @example
 * type ButtonCssVars = GenerateCssVarsType<{color:"--Button-color";size:"--Button-size"}>;
 *  ButtonCssVars would be {
 * '--Button-color'?: string | number;
 * '--Button-size'?: string | number;
 * }
 */
export type GenerateCssVarsType<CssVars extends object> = {
  [Key in keyof CssVars as CssVars[Key] extends string ? CssVars[Key] : never]?: string | number;
};
