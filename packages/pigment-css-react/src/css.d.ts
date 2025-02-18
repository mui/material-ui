import type { CSSObjectNoCallback } from './base';
import type { ThemeArgs } from './theme';

type Primitve = string | null | undefined | boolean | number;

type CssArg = ((themeArgs: ThemeArgs) => CSSObjectNoCallback) | CSSObjectNoCallback;
type CssFn = (themeArgs: ThemeArgs) => string | number;

interface Css {
  /**
   * @returns {string} The generated css class name to be referenced.
   */
  (arg: TemplateStringsArray, ...templateArgs: (Primitve | CssFn)[]): string;
  /**
   * @returns {string} The generated css class name to be referenced.
   */
  (...arg: CssArg[]): string;
}

declare const css: Css;

export default css;
