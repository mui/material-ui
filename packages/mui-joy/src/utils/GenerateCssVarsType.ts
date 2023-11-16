/**
 * A type which generates CSS Variables.
 * @example
 * type ButtonCssVars = GenerateCssVarsType<{color:"--Button-color";size:"--Button-size"}>;
 *  ButtonCssVars would be {
 * '--Button-color'?: string | number;
 * '--Button-size'?: string | number;
 * }
 */
export type GenerateCssVarsType<CssVars extends Record<string, string>> = {
  [Key in keyof CssVars as CssVars[Key]]?: string | number;
};
