import type {
  CssVarsTheme,
  CssVarsPalette,
  PaletteCommonChannel,
  PaletteColorChannel,
  PaletteTextChannel,
  PaletteActionChannel,
  ThemeVars,
  ThemeCssVar,
} from '../styles/experimental_extendTheme';

type Split<T, K extends keyof T = keyof T> = K extends string | number
  ? { [k in K]: Exclude<T[K], undefined> }
  : never;

type ConcatDeep<T> = T extends Record<string | number, infer V>
  ? keyof T extends string | number
    ? V extends string | number
      ? keyof T
      : keyof V extends string | number
      ? `${keyof T}-${ConcatDeep<Split<V>>}`
      : never
    : never
  : never;

/**
 * Does not work for these cases:
 * - { borderRadius: string | number } // the value can't be a union
 * - { shadows: [string, string, ..., string] } // the value can't be an array
 */
type NormalizeVars<T> = ConcatDeep<Split<T>>;

type ThemeDefaultCssVar = {
  [k in
    | NormalizeVars<Omit<ThemeVars, 'overlays' | 'shadows' | 'shape'>>
    | 'shape-borderRadius'
    | 'shadows-0'
    | 'shadows-1'
    | 'shadows-2'
    | 'shadows-3'
    | 'shadows-4'
    | 'shadows-5'
    | 'shadows-6'
    | 'shadows-7'
    | 'shadows-8'
    | 'shadows-9'
    | 'shadows-10'
    | 'shadows-11'
    | 'shadows-12'
    | 'shadows-13'
    | 'shadows-14'
    | 'shadows-15'
    | 'shadows-16'
    | 'shadows-17'
    | 'shadows-18'
    | 'shadows-19'
    | 'shadows-20'
    | 'shadows-21'
    | 'shadows-22'
    | 'shadows-23'
    | 'shadows-24'
    | 'overlays-0'
    | 'overlays-1'
    | 'overlays-2'
    | 'overlays-3'
    | 'overlays-4'
    | 'overlays-5'
    | 'overlays-6'
    | 'overlays-7'
    | 'overlays-8'
    | 'overlays-9'
    | 'overlays-10'
    | 'overlays-11'
    | 'overlays-12'
    | 'overlays-13'
    | 'overlays-14'
    | 'overlays-15'
    | 'overlays-16'
    | 'overlays-17'
    | 'overlays-18'
    | 'overlays-19'
    | 'overlays-20'
    | 'overlays-21'
    | 'overlays-22'
    | 'overlays-23'
    | 'overlays-24']: true;
};

/**
 * Enhance the theme types to include new properties from the CssVarsProvider.
 * The theme is typed with CSS variables in `styled`, `sx`, `useTheme`, etc.
 */
declare module '@mui/material/styles' {
  interface ThemeCssVarOverrides extends ThemeDefaultCssVar {}

  // The palette must be extended in each node.
  interface Theme extends Omit<CssVarsTheme, 'palette'> {
    // v6 TODO: move this util to CssVarsTheme. The current minimum typescript (3.5) does not support string literal.
    getCssVar: (field: ThemeCssVar, ...vars: ThemeCssVar[]) => string;
  }

  // Extend the type that will be used in palette
  interface CommonColors extends PaletteCommonChannel {}
  interface PaletteColor extends PaletteColorChannel {}
  interface TypeText extends PaletteTextChannel {}
  interface TypeAction extends PaletteActionChannel {}

  // The extended Palette should be in sync with `extendTheme`
  interface Palette extends CssVarsPalette {}
}
