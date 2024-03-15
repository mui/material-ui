import type { CSSProperties } from './base';
import type { ThemeArgs } from './theme';

export type Primitve = string | null | undefined | boolean | number;

interface KeyframesObject {
  [key: string]: {
    [K in keyof CSSProperties]: CSSProperties[K] | Array<CSSProperties[K]>;
  };
}

type KeyframesArg = ((themeArgs: ThemeArgs) => KeyframesObject) | KeyframesObject;

interface Keyframes {
  /**
   * @returns {string} The generated keyframe name to be referenced.
   */
  (arg: TemplateStringsArray, ...templateArgs: Primitve[]): string;
  /**
   * @returns {string} The generated keyframe name to be referenced.
   */
  (arg: KeyframesArg): string;
}

declare const keyframes: Keyframes;

export default keyframes;
