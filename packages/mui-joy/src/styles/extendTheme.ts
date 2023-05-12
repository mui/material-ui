import { deepmerge } from '@mui/utils';
import {
  BreakpointsOptions,
  SpacingOptions,
  createBreakpoints,
  createSpacing,
  colorChannel,
  unstable_prepareCssVars as prepareCssVars,
  unstable_createGetCssVar as systemCreateGetCssVar,
  unstable_styleFunctionSx as styleFunctionSx,
  SxConfig,
} from '@mui/system';
import defaultSxConfig from './sxConfig';
import colors, { blue, green, grey, purple, red, yellow } from '../colors/colors';
import defaultShouldSkipGeneratingVar from './shouldSkipGeneratingVar';
import { DefaultColorScheme, ExtendedColorScheme, SupportedColorScheme } from './types/colorScheme';
import { ColorSystem, ColorPaletteProp, Palette, PaletteOptions } from './types/colorSystem';
import { Focus } from './types/focus';
import { TypographySystemOptions, FontSize } from './types/typography';
import { Variants, ColorInversion, ColorInversionConfig } from './types/variants';
import { Theme, ThemeCssVar, ThemeScalesOptions, SxProps, ThemeVars } from './types';
import { Components } from './components';
import { generateUtilityClass } from '../className';
import { createSoftInversion, createSolidInversion, createVariants } from './variantUtils';
import { MergeDefault } from './types/utils';

type Partial2Level<T> = {
  [K in keyof T]?: T[K] extends Record<any, any>
    ? {
        [J in keyof T[K]]?: T[K][J];
      }
    : T[K];
};

type Partial3Level<T> = {
  [K in keyof T]?: {
    [J in keyof T[K]]?: T[K][J] extends Record<any, any>
      ? {
          [P in keyof T[K][J]]?: T[K][J][P];
        }
      : T[K][J];
  };
};

export type ColorSystemOptions = Partial3Level<
  MergeDefault<ColorSystem, { palette: PaletteOptions }>
> & {
  shadowRing?: string;
  shadowChannel?: string;
};

// Use Partial2Level instead of PartialDeep because nested value type is CSSObject which does not work with PartialDeep.
export interface CssVarsThemeOptions extends Partial2Level<ThemeScalesOptions> {
  /**
   * Prefix of the generated CSS variables
   * @default 'joy'
   * @example extendTheme({ cssVarPrefix: 'foo-bar' })
   * // { ..., typography: { body1: { fontSize: 'var(--foo-bar-fontSize-md)' } }, ... }
   *
   * @example <caption>Provides empty string ('') to remove the prefix</caption>
   * extendTheme({ cssVarPrefix: 'foo-bar' })
   * // { ..., typography: { body1: { fontSize: 'var(--fontSize-md)' } }, ... }
   */
  cssVarPrefix?: string;
  focus?: Partial<Focus>;
  typography?: Partial<TypographySystemOptions>;
  variants?: Partial2Level<Variants>;
  colorInversion?:
    | Partial2Level<ColorInversion>
    | ((theme: Theme) => Partial2Level<ColorInversion>);
  colorInversionConfig?: ColorInversionConfig;
  breakpoints?: BreakpointsOptions;
  spacing?: SpacingOptions;
  components?: Components<Theme>;
  colorSchemes?: Partial<Record<DefaultColorScheme | ExtendedColorScheme, ColorSystemOptions>>;
  unstable_sxConfig?: SxConfig;
  /**
   * A function to determine if the key, value should be attached as CSS Variable
   * `keys` is an array that represents the object path keys.
   *  Ex, if the theme is { foo: { bar: 'var(--test)' } }
   *  then, keys = ['foo', 'bar']
   *        value = 'var(--test)'
   */
  shouldSkipGeneratingVar?: (keys: string[], value: string | number) => boolean;
}

export const createGetCssVar = (cssVarPrefix = 'joy') =>
  systemCreateGetCssVar<ThemeCssVar>(cssVarPrefix);

export default function extendTheme(themeOptions?: CssVarsThemeOptions): Theme {
  console.time('step 1');
  const {
    cssVarPrefix = 'joy',
    breakpoints,
    spacing,
    components: componentsInput,
    variants: variantsInput,
    colorInversion: colorInversionInput,
    shouldSkipGeneratingVar = defaultShouldSkipGeneratingVar,
    ...scalesInput
  } = themeOptions || {};
  const getCssVar = createGetCssVar(cssVarPrefix);

  console.time('step 1.2');
  const lightColorSystem = {
    palette: {
      mode: 'light',
      primary: {
        ...blue,
        plainColor: `var(--joy-palette-primary-600, ${blue[600]})`,
        plainHoverBg: `var(--joy-palette-primary-100, ${blue[100]})`,
        plainActiveBg: `var(--joy-palette-primary-200, ${blue[200]})`,
        plainDisabledColor: `var(--joy-palette-primary-200, ${blue[200]})`,

        outlinedColor: `var(--joy-palette-primary-500, ${blue[500]})`,
        outlinedBorder: `var(--joy-palette-primary-200, ${blue[200]})`,
        outlinedHoverBg: `var(--joy-palette-primary-100, ${blue[100]})`,
        outlinedHoverBorder: `var(--joy-palette-primary-300, ${blue[300]})`,
        outlinedActiveBg: `var(--joy-palette-primary-200, ${blue[200]})`,
        outlinedDisabledColor: `var(--joy-palette-primary-100, ${blue[100]})`,
        outlinedDisabledBorder: `var(--joy-palette-primary-100, ${blue[100]})`,

        softColor: `var(--joy-palette-primary-600, ${blue[600]})`,
        softBg: `var(--joy-palette-primary-100, ${blue[100]})`,
        softHoverBg: `var(--joy-palette-primary-200, ${blue[200]})`,
        softActiveBg: `var(--joy-palette-primary-300, ${blue[300]})`,
        softDisabledColor: `var(--joy-palette-primary-300, ${blue[300]})`,
        softDisabledBg: `var(--joy-palette-primary-50, ${blue[50]})`,

        solidColor: '#fff',
        solidBg: `var(--palette-primary-500, ${blue[500]})`,
        solidHoverBg: `var(--palette-primary-600, ${blue[600]})`,
        solidActiveBg: `var(--palette-primary-700, ${blue[700]})`,
        solidDisabledColor: `#fff`,
        solidDisabledBg: `var(--palette-primary-200, ${blue[200]})`,
      },
      neutral: {
        ...grey,
        plainColor: `var(--joy-palette-neutral-800, ${grey[800]})`,
        plainHoverColor: `var(--joy-palette-neutral-900, ${grey[900]})`,
        plainHoverBg: `var(--joy-palette-neutral-100, ${grey[100]})`,
        plainActiveBg: `var(--joy-palette-neutral-200, ${grey[200]})`,
        plainDisabledColor: `var(--joy-palette-neutral-300, ${grey[300]})`,

        outlinedColor: `var(--joy-palette-neutral-800, ${grey[800]})`,
        outlinedBorder: `var(--joy-palette-neutral-200, ${grey[200]})`,
        outlinedHoverColor: `var(--joy-palette-neutral-900, ${grey[900]})`,
        outlinedHoverBg: `var(--joy-palette-neutral-100, ${grey[100]})`,
        outlinedHoverBorder: `var(--joy-palette-neutral-300, ${grey[300]})`,
        outlinedActiveBg: `var(--joy-palette-neutral-200, ${grey[200]})`,
        outlinedDisabledColor: `var(--joy-palette-neutral-300, ${grey[300]})`,
        outlinedDisabledBorder: `var(--joy-palette-neutral-100, ${grey[100]})`,

        softColor: `var(--joy-palette-neutral-800, ${grey[800]})`,
        softBg: `var(--joy-palette-neutral-100, ${grey[100]})`,
        softHoverColor: `var(--joy-palette-neutral-900, ${grey[900]})`,
        softHoverBg: `var(--joy-palette-neutral-200, ${grey[200]})`,
        softActiveBg: `var(--joy-palette-neutral-300, ${grey[300]})`,
        softDisabledColor: `var(--joy-palette-neutral-300, ${grey[300]})`,
        softDisabledBg: `var(--joy-palette-neutral-50, ${grey[50]})`,
        solidColor: `var(--joy-palette-common-white, #fff)`,
        solidBg: `var(--joy-palette-neutral-600, ${grey[600]})`,
        solidHoverBg: `var(--joy-palette-neutral-700, ${grey[700]})`,
        solidActiveBg: `var(--joy-palette-neutral-800, ${grey[800]})`,
        solidDisabledColor: `var(--joy-palette-neutral-300, ${grey[300]})`,
        solidDisabledBg: `var(--joy-palette-neutral-50, ${grey[50]})`,
      },
      danger: {
        ...red,
        plainColor: `var(--joy-palette-danger-600, ${red[600]})`,
        plainHoverBg: `var(--joy-palette-danger-100, ${red[100]})`,
        plainActiveBg: `var(--joy-palette-danger-200, ${red[200]})`,
        plainDisabledColor: `var(--joy-palette-danger-200, ${red[200]})`,

        outlinedColor: `var(--joy-palette-danger-500, ${red[500]})`,
        outlinedBorder: `var(--joy-palette-danger-200, ${red[200]})`,
        outlinedHoverBg: `var(--joy-palette-danger-100, ${red[100]})`,
        outlinedHoverBorder: `var(--joy-palette-danger-300, ${red[300]})`,
        outlinedActiveBg: `var(--joy-palette-danger-200, ${red[200]})`,
        outlinedDisabledColor: `var(--joy-palette-danger-100, ${red[100]})`,
        outlinedDisabledBorder: `var(--joy-palette-danger-100, ${red[100]})`,

        softColor: `var(--joy-palette-danger-600, ${red[600]})`,
        softBg: `var(--joy-palette-danger-100, ${red[100]})`,
        softHoverBg: `var(--joy-palette-danger-200, ${red[200]})`,
        softActiveBg: `var(--joy-palette-danger-300, ${red[300]})`,
        softDisabledColor: `var(--joy-palette-danger-300, ${red[300]})`,
        softDisabledBg: `var(--joy-palette-danger-50, ${red[50]})`,

        solidColor: '#fff',
        solidBg: `var(--palette-danger-500, ${red[500]})`,
        solidHoverBg: `var(--palette-danger-600, ${red[600]})`,
        solidActiveBg: `var(--palette-danger-700, ${red[700]})`,
        solidDisabledColor: `#fff`,
        solidDisabledBg: `var(--palette-danger-200, ${red[200]})`,
      },
      info: {
        ...purple,
        plainColor: `var(--joy-palette-info-600, ${purple[600]})`,
        plainHoverBg: `var(--joy-palette-info-100, ${purple[100]})`,
        plainActiveBg: `var(--joy-palette-info-200, ${purple[200]})`,
        plainDisabledColor: `var(--joy-palette-info-200, ${purple[200]})`,

        outlinedColor: `var(--joy-palette-info-500, ${purple[500]})`,
        outlinedBorder: `var(--joy-palette-info-200, ${purple[200]})`,
        outlinedHoverBg: `var(--joy-palette-info-100, ${purple[100]})`,
        outlinedHoverBorder: `var(--joy-palette-info-300, ${purple[300]})`,
        outlinedActiveBg: `var(--joy-palette-info-200, ${purple[200]})`,
        outlinedDisabledColor: `var(--joy-palette-info-100, ${purple[100]})`,
        outlinedDisabledBorder: `var(--joy-palette-info-100, ${purple[100]})`,

        softColor: `var(--joy-palette-info-600, ${purple[600]})`,
        softBg: `var(--joy-palette-info-100, ${purple[100]})`,
        softHoverBg: `var(--joy-palette-info-200, ${purple[200]})`,
        softActiveBg: `var(--joy-palette-info-300, ${purple[300]})`,
        softDisabledColor: `var(--joy-palette-info-300, ${purple[300]})`,
        softDisabledBg: `var(--joy-palette-info-50, ${purple[50]})`,

        solidColor: '#fff',
        solidBg: `var(--palette-info-500, ${purple[500]})`,
        solidHoverBg: `var(--palette-info-600, ${purple[600]})`,
        solidActiveBg: `var(--palette-info-700, ${purple[700]})`,
        solidDisabledColor: `#fff`,
        solidDisabledBg: `var(--palette-info-200, ${purple[200]})`,
      },
      success: {
        ...green,
        plainColor: `var(--joy-palette-success-600, ${green[600]})`,
        plainHoverBg: `var(--joy-palette-success-100, ${green[100]})`,
        plainActiveBg: `var(--joy-palette-success-200, ${green[200]})`,
        plainDisabledColor: `var(--joy-palette-success-200, ${green[200]})`,

        outlinedColor: `var(--joy-palette-success-500, ${green[500]})`,
        outlinedBorder: `var(--joy-palette-success-200, ${green[200]})`,
        outlinedHoverBg: `var(--joy-palette-success-100, ${green[100]})`,
        outlinedHoverBorder: `var(--joy-palette-success-300, ${green[300]})`,
        outlinedActiveBg: `var(--joy-palette-success-200, ${green[200]})`,
        outlinedDisabledColor: `var(--joy-palette-success-100, ${green[100]})`,
        outlinedDisabledBorder: `var(--joy-palette-success-100, ${green[100]})`,

        softColor: `var(--joy-palette-success-600, ${green[600]})`,
        softBg: `var(--joy-palette-success-100, ${green[100]})`,
        softHoverBg: `var(--joy-palette-success-200, ${green[200]})`,
        softActiveBg: `var(--joy-palette-success-300, ${green[300]})`,
        softDisabledColor: `var(--joy-palette-success-300, ${green[300]})`,
        softDisabledBg: `var(--joy-palette-success-50, ${green[50]})`,

        solidColor: '#fff',
        solidBg: `var(--palette-success-500, ${green[500]})`,
        solidHoverBg: `var(--palette-success-600, ${green[600]})`,
        solidActiveBg: `var(--palette-success-700, ${green[700]})`,
        solidDisabledColor: `#fff`,
        solidDisabledBg: `var(--palette-success-200, ${green[200]})`,
      },
      warning: {
        ...yellow,
        plainColor: `var(--joy-palette-warning-800, ${yellow[800]})`,
        plainHoverBg: `var(--joy-palette-warning-50, ${yellow[50]})`,
        plainActiveBg: `var(--joy-palette-warning-200, ${yellow[200]})`,
        plainDisabledColor: `var(--joy-palette-warning-200, ${yellow[200]})`,

        outlinedColor: `var(--joy-palette-warning-800, ${yellow[800]})`,
        outlinedBorder: `var(--joy-palette-warning-200, ${yellow[200]})`,
        outlinedHoverBg: `var(--joy-palette-warning-50, ${yellow[50]})`,
        outlinedHoverBorder: `var(--joy-palette-warning-300, ${yellow[300]})`,
        outlinedActiveBg: `var(--joy-palette-warning-200, ${yellow[200]})`,
        outlinedDisabledColor: `var(--joy-palette-warning-100, ${yellow[100]})`,
        outlinedDisabledBorder: `var(--joy-palette-warning-100, ${yellow[100]})`,

        softColor: `var(--joy-palette-warning-800, ${yellow[800]})`,
        softBg: `var(--joy-palette-warning-50, ${yellow[50]})`,
        softHoverBg: `var(--joy-palette-warning-100, ${yellow[100]})`,
        softActiveBg: `var(--joy-palette-warning-200, ${yellow[200]})`,
        softDisabledColor: `var(--joy-palette-warning-200, ${yellow[200]})`,
        softDisabledBg: `var(--joy-palette-warning-50, ${yellow[50]})`,

        solidColor: `var(--joy-palette-warning-800, ${yellow[800]})`,
        solidBg: `var(--joy-palette-warning-200, ${yellow[200]})`,
        solidHoverBg: `var(--joy-palette-warning-300, ${yellow[300]})`,
        solidActiveBg: `var(--joy-palette-warning-400, ${yellow[400]})`,
        solidDisabledColor: `var(--joy-palette-warning-200, ${yellow[200]})`,
        solidDisabledBg: `var(--joy-palette-warning-50, ${yellow[50]})`,
      },
      common: {
        white: '#FFF',
        black: '#09090D',
      },
      text: {
        primary: `var(--joy-palette-neutral-800, ${grey[800]})`,
        secondary: `var(--joy-palette-neutral-600, ${grey[600]})`,
        tertiary: `var(--joy-palette-neutral-500, ${grey[500]})`,
      },
      background: {
        body: `var(--joy-palette-common-white, #fff)`,
        surface: `var(--joy-palette-common-white, #fff)`,
        popup: `var(--joy-palette-common-white, #fff)`,
        level1: `var(--joy-palette-neutral-50, ${grey[50]})`,
        level2: `var(--joy-palette-neutral-100, ${grey[100]})`,
        level3: `var(--joy-palette-neutral-200, ${grey[200]})`,
        tooltip: `var(--joy-palette-neutral-800, ${grey[800]})`,
        backdrop: 'rgba(255 255 255 / 0.5)',
      },
      divider: `rgba(var(--joy-palette-neutral-mainChannel, 115 115 140) / 0.28)`, // should be the same index as in `attachColorChannels`
      focusVisible: `var(--joy-palette-primary-500, ${grey[500]})`,
    },
    shadowRing: '0 0 #000',
    shadowChannel: '187 187 187',
  };
  const darkColorSystem = {
    palette: {
      mode: 'dark',
      primary: {
        ...blue,
        plainColor: `var(--joy-palette-primary-300, ${blue[300]})`,
        plainHoverBg: `var(--joy-palette-primary-800, ${blue[300]})`,
        plainActiveBg: `var(--joy-palette-primary-700, ${blue[700]})`,
        plainDisabledColor: `var(--joy-palette-primary-800, ${blue[800]})`,

        outlinedColor: `var(--joy-palette-primary-200, ${blue[200]})`,
        outlinedBorder: `var(--joy-palette-primary-700, ${blue[700]})`,
        outlinedHoverBg: `var(--joy-palette-primary-800, ${blue[800]})`,
        outlinedHoverBorder: `var(--joy-palette-primary-600, ${blue[600]})`,
        outlinedActiveBg: `var(--joy-palette-primary-900, ${blue[900]})`,
        outlinedDisabledColor: `var(--joy-palette-primary-800, ${blue[800]})`,
        outlinedDisabledBorder: `var(--joy-palette-primary-800, ${blue[800]})`,

        softColor: `var(--joy-palette-primary-200, ${blue[200]})`,
        softBg: `var(--joy-palette-primary-900, ${blue[900]})`,
        softHoverBg: `var(--joy-palette-primary-800, ${blue[800]})`,
        softActiveBg: `var(--joy-palette-primary-700, ${blue[700]})`,
        softDisabledColor: `var(--joy-palette-primary-800, ${blue[800]})`,
        softDisabledBg: `var(--joy-palette-primary-900, ${blue[900]})`,

        solidColor: `#fff`,
        solidBg: `var(--joy-palette-primary-600, ${blue[600]})`,
        solidHoverBg: `var(--joy-palette-primary-700, ${blue[700]})`,
        solidActiveBg: `var(--joy-palette-primary-800, ${blue[800]})`,
        solidDisabledColor: `var(--joy-palette-primary-700, ${blue[700]})`,
        solidDisabledBg: `var(--joy-palette-primary-900, ${blue[900]})`,
      },
      neutral: {
        ...grey,
        plainColor: `var(--joy-palette-neutral-200, ${grey[200]})`,
        plainHoverColor: `var(--joy-palette-neutral-50, ${grey[50]})`,
        plainHoverBg: `var(--joy-palette-neutral-800, ${grey[800]})`,
        plainActiveBg: `var(--joy-palette-neutral-700, ${grey[700]})`,
        plainDisabledColor: `var(--joy-palette-neutral-700, ${grey[700]})`,

        outlinedColor: `var(--joy-palette-neutral-200, ${grey[200]})`,
        outlinedBorder: `var(--joy-palette-neutral-800, ${grey[800]})`,
        outlinedHoverColor: `var(--joy-palette-neutral-50, ${grey[50]})`,
        outlinedHoverBg: `var(--joy-palette-neutral-800, ${grey[800]})`,
        outlinedHoverBorder: `var(--joy-palette-neutral-700, ${grey[700]})`,
        outlinedActiveBg: `var(--joy-palette-neutral-800, ${grey[800]})`,
        outlinedDisabledColor: `var(--joy-palette-neutral-800, ${grey[800]})`,
        outlinedDisabledBorder: `var(--joy-palette-neutral-800, ${grey[800]})`,

        softColor: `var(--joy-palette-neutral-200, ${grey[200]})`,
        softBg: `var(--joy-palette-neutral-800, ${grey[800]})`,
        softHoverColor: `var(--joy-palette-neutral-50, ${grey[50]})`,
        softHoverBg: `var(--joy-palette-neutral-700, ${grey[700]})`,
        softActiveBg: `var(--joy-palette-neutral-600, ${grey[600]})`,
        softDisabledColor: `var(--joy-palette-neutral-700, ${grey[700]})`,
        softDisabledBg: `var(--joy-palette-neutral-900, ${grey[900]})`,

        solidColor: `var(--joy-palette-common-white, #fff)`,
        solidBg: `var(--joy-palette-neutral-600, ${grey[600]})`,
        solidHoverBg: `var(--joy-palette-neutral-700, ${grey[700]})`,
        solidActiveBg: `var(--joy-palette-neutral-800, ${grey[800]})`,
        solidDisabledColor: `var(--joy-palette-neutral-700, ${grey[700]})`,
        solidDisabledBg: `var(--joy-palette-neutral-900, ${grey[900]})`,
      },
      danger: {
        ...red,
        plainColor: `var(--joy-palette-danger-300, ${red[300]})`,
        plainHoverBg: `var(--joy-palette-danger-800, ${red[300]})`,
        plainActiveBg: `var(--joy-palette-danger-700, ${red[700]})`,
        plainDisabledColor: `var(--joy-palette-danger-800, ${red[800]})`,

        outlinedColor: `var(--joy-palette-danger-200, ${red[200]})`,
        outlinedBorder: `var(--joy-palette-danger-700, ${red[700]})`,
        outlinedHoverBg: `var(--joy-palette-danger-800, ${red[800]})`,
        outlinedHoverBorder: `var(--joy-palette-danger-600, ${red[600]})`,
        outlinedActiveBg: `var(--joy-palette-danger-900, ${red[900]})`,
        outlinedDisabledColor: `var(--joy-palette-danger-800, ${red[800]})`,
        outlinedDisabledBorder: `var(--joy-palette-danger-800, ${red[800]})`,

        softColor: `var(--joy-palette-danger-200, ${red[200]})`,
        softBg: `var(--joy-palette-danger-900, ${red[900]})`,
        softHoverBg: `var(--joy-palette-danger-800, ${red[800]})`,
        softActiveBg: `var(--joy-palette-danger-700, ${red[700]})`,
        softDisabledColor: `var(--joy-palette-danger-800, ${red[800]})`,
        softDisabledBg: `var(--joy-palette-danger-900, ${red[900]})`,

        solidColor: `#fff`,
        solidBg: `var(--joy-palette-danger-600, ${red[600]})`,
        solidHoverBg: `var(--joy-palette-danger-700, ${red[700]})`,
        solidActiveBg: `var(--joy-palette-danger-800, ${red[800]})`,
        solidDisabledColor: `var(--joy-palette-danger-700, ${red[700]})`,
        solidDisabledBg: `var(--joy-palette-danger-900, ${red[900]})`,
      },
      info: {
        ...purple,
        plainColor: `var(--joy-palette-info-300, ${purple[300]})`,
        plainHoverBg: `var(--joy-palette-info-800, ${purple[300]})`,
        plainActiveBg: `var(--joy-palette-info-700, ${purple[700]})`,
        plainDisabledColor: `var(--joy-palette-info-800, ${purple[800]})`,

        outlinedColor: `var(--joy-palette-info-200, ${purple[200]})`,
        outlinedBorder: `var(--joy-palette-info-700, ${purple[700]})`,
        outlinedHoverBg: `var(--joy-palette-info-800, ${purple[800]})`,
        outlinedHoverBorder: `var(--joy-palette-info-600, ${purple[600]})`,
        outlinedActiveBg: `var(--joy-palette-info-900, ${purple[900]})`,
        outlinedDisabledColor: `var(--joy-palette-info-800, ${purple[800]})`,
        outlinedDisabledBorder: `var(--joy-palette-info-800, ${purple[800]})`,

        softColor: `var(--joy-palette-info-200, ${purple[200]})`,
        softBg: `var(--joy-palette-info-900, ${purple[900]})`,
        softHoverBg: `var(--joy-palette-info-800, ${purple[800]})`,
        softActiveBg: `var(--joy-palette-info-700, ${purple[700]})`,
        softDisabledColor: `var(--joy-palette-info-800, ${purple[800]})`,
        softDisabledBg: `var(--joy-palette-info-900, ${purple[900]})`,

        solidColor: `#fff`,
        solidBg: `var(--joy-palette-info-600, ${purple[600]})`,
        solidHoverBg: `var(--joy-palette-info-700, ${purple[700]})`,
        solidActiveBg: `var(--joy-palette-info-800, ${purple[800]})`,
        solidDisabledColor: `var(--joy-palette-info-700, ${purple[700]})`,
        solidDisabledBg: `var(--joy-palette-info-900, ${purple[900]})`,
      },
      success: {
        ...green,
        plainColor: `var(--joy-palette-success-300, ${green[300]})`,
        plainHoverBg: `var(--joy-palette-success-800, ${green[300]})`,
        plainActiveBg: `var(--joy-palette-success-700, ${green[700]})`,
        plainDisabledColor: `var(--joy-palette-success-800, ${green[800]})`,

        outlinedColor: `var(--joy-palette-success-200, ${green[200]})`,
        outlinedBorder: `var(--joy-palette-success-700, ${green[700]})`,
        outlinedHoverBg: `var(--joy-palette-success-800, ${green[800]})`,
        outlinedHoverBorder: `var(--joy-palette-success-600, ${green[600]})`,
        outlinedActiveBg: `var(--joy-palette-success-900, ${green[900]})`,
        outlinedDisabledColor: `var(--joy-palette-success-800, ${green[800]})`,
        outlinedDisabledBorder: `var(--joy-palette-success-800, ${green[800]})`,

        softColor: `var(--joy-palette-success-200, ${green[200]})`,
        softBg: `var(--joy-palette-success-900, ${green[900]})`,
        softHoverBg: `var(--joy-palette-success-800, ${green[800]})`,
        softActiveBg: `var(--joy-palette-success-700, ${green[700]})`,
        softDisabledColor: `var(--joy-palette-success-800, ${green[800]})`,
        softDisabledBg: `var(--joy-palette-success-900, ${green[900]})`,

        solidColor: '#fff',
        solidBg: `var(--joy-palette-success-600, ${green[600]})`,
        solidHoverBg: `var(--joy-palette-success-700, ${green[700]})`,
        solidActiveBg: `var(--joy-palette-success-800, ${green[800]})`,
        solidDisabledColor: `var(--joy-palette-success-700, ${green[700]})`,
        solidDisabledBg: `var(--joy-palette-success-900, ${green[900]})`,
      },
      warning: {
        ...yellow,
        plainColor: `var(--joy-palette-warning-300, ${yellow[300]})`,
        plainHoverBg: `var(--joy-palette-warning-800, ${yellow[300]})`,
        plainActiveBg: `var(--joy-palette-warning-700, ${yellow[700]})`,
        plainDisabledColor: `var(--joy-palette-warning-800, ${yellow[800]})`,

        outlinedColor: `var(--joy-palette-warning-200, ${yellow[200]})`,
        outlinedBorder: `var(--joy-palette-warning-700, ${yellow[700]})`,
        outlinedHoverBg: `var(--joy-palette-warning-800, ${yellow[800]})`,
        outlinedHoverBorder: `var(--joy-palette-warning-600, ${yellow[600]})`,
        outlinedActiveBg: `var(--joy-palette-warning-900, ${yellow[900]})`,
        outlinedDisabledColor: `var(--joy-palette-warning-800, ${yellow[800]})`,
        outlinedDisabledBorder: `var(--joy-palette-warning-800, ${yellow[800]})`,

        softColor: `var(--joy-palette-warning-200, ${yellow[200]})`,
        softBg: `var(--joy-palette-warning-900, ${yellow[900]})`,
        softHoverBg: `var(--joy-palette-warning-800, ${yellow[800]})`,
        softActiveBg: `var(--joy-palette-warning-700, ${yellow[700]})`,
        softDisabledColor: `var(--joy-palette-warning-800, ${yellow[800]})`,
        softDisabledBg: `var(--joy-palette-warning-900, ${yellow[900]})`,

        solidColor: `var(--joy-palette-common-black, #09090D)`,
        solidBg: `var(--joy-palette-warning-300, ${yellow[300]})`,
        solidHoverBg: `var(--joy-palette-warning-400, ${yellow[400]})`,
        solidActiveBg: `var(--joy-palette-warning-500, ${yellow[500]})`,
        solidDisabledColor: `var(--joy-palette-warning-700, ${yellow[700]})`,
        solidDisabledBg: `var(--joy-palette-warning-900, ${yellow[900]})`,
      },
      common: {
        white: '#FFF',
        black: '#09090D',
      },
      text: {
        primary: `var(--joy-palette-neutral-100, ${grey[100]})`,
        secondary: `var(--joy-palette-neutral-300, ${grey[300]})`,
        tertiary: `var(--joy-palette-neutral-400, ${grey[400]})`,
      },
      background: {
        body: `var(--joy-palette-neutral-900, ${grey[900]})`,
        surface: `var(--joy-palette-common-black, #09090D)`,
        popup: `var(--joy-palette-neutral-800, ${grey[900]})`,
        level1: `var(--joy-palette-neutral-800, ${grey[800]})`,
        level2: `var(--joy-palette-neutral-700, ${grey[700]})`,
        level3: `var(--joy-palette-neutral-600, ${grey[600]})`,
        tooltip: `var(--joy-palette-neutral-600, ${grey[600]})`,
        backdrop: `rgba(var(--joy-palette-neutral-darkChannel, 37 37 45) / 0.5)`, // should be the same index as in `attachColorChannels`
      },
      divider: `rgba(var(--joy-palette-neutral-mainChannel, 115 115 140) / 0.24)`, // should be the same index as in `attachColorChannels`
      focusVisible: `var(--joy-palette-primary-500)`,
    },
    shadowRing: '0 0 #000',
    shadowChannel: '0 0 0',
  };
  console.timeEnd('step 1.2');

  const fontFamilyFallback =
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';
  const fontFamily = {
    body: `"Public Sans", var(--joy-fontFamily-fallback, ${fontFamilyFallback})`,
    display: `"Public Sans", var(--joy-fontFamily-fallback, ${fontFamilyFallback})`,
    code: 'Source Code Pro,ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace',
    fallback: fontFamilyFallback,
    ...scalesInput.fontFamily,
  };

  const fontWeight = {
    xs: 200,
    sm: 300,
    md: 500,
    lg: 600,
    xl: 700,
    xl2: 800,
    xl3: 900,
    ...scalesInput.fontWeight,
  };

  const fontSize = {
    xs3: '0.5rem',
    xs2: '0.625rem',
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    xl2: '1.5rem',
    xl3: '1.875rem',
    xl4: '2.25rem',
    xl5: '3rem',
    xl6: '3.75rem',
    xl7: '4.5rem',
    ...scalesInput.fontSize,
  };

  const lineHeight = {
    sm: 1.25,
    md: 1.5,
    lg: 1.7,
    ...scalesInput.lineHeight,
  };

  const letterSpacing = {
    sm: '-0.01em',
    md: '0.083em',
    lg: '0.125em',
    ...scalesInput.letterSpacing,
  };

  console.time('step 1.3');
  const defaultShadowRing =
    scalesInput.colorSchemes?.light?.shadowRing || lightColorSystem.shadowRing;
  const defaultShadowChannel =
    scalesInput.colorSchemes?.light?.shadowChannel || lightColorSystem.shadowChannel;
  let defaultScales = {
    colorSchemes: {
      light: lightColorSystem,
      dark: darkColorSystem,
    },
    fontSize,
    fontFamily,
    fontWeight,
    focus: {
      thickness: '2px',
      selector: `&.${generateUtilityClass('', 'focusVisible')}, &:focus-visible`,
      default: {
        outlineOffset: `var(--focus-outline-offset, var(--joy-focus-thickness, ${
          scalesInput.focus?.thickness || '2px'
        }))`,
        outline: `var(--focus-thickness, ${
          scalesInput.focus?.thickness || '2px'
        }) solid var(--joy-palette-focusVisible, ${blue[500]})`,
      },
    },
    lineHeight,
    letterSpacing,
    radius: {
      xs: '4px',
      sm: '8px',
      md: '12px',
      lg: '16px',
      xl: '20px',
    },
    shadow: {
      xs: `var(--joy-shadowRing, ${defaultShadowRing}), 0 1px 2px 0 rgba(var(--joy-shadowChannel, ${defaultShadowChannel}) / 0.12)`,
      sm: `var(--joy-shadowRing, ${defaultShadowRing}), 0.3px 0.8px 1.1px rgba(var(--joy-shadowChannel, ${defaultShadowChannel}) / 0.11), 0.5px 1.3px 1.8px -0.6px rgba(var(--joy-shadowChannel, ${defaultShadowChannel}) / 0.18), 1.1px 2.7px 3.8px -1.2px rgba(var(--joy-shadowChannel, ${defaultShadowChannel}) / 0.26)`,
      md: `var(--joy-shadowRing, ${defaultShadowRing}), 0.3px 0.8px 1.1px rgba(var(--joy-shadowChannel, ${defaultShadowChannel}) / 0.12), 1.1px 2.8px 3.9px -0.4px rgba(var(--joy-shadowChannel, ${defaultShadowChannel}) / 0.17), 2.4px 6.1px 8.6px -0.8px rgba(var(--joy-shadowChannel, ${defaultShadowChannel}) / 0.23), 5.3px 13.3px 18.8px -1.2px rgba(var(--joy-shadowChannel, ${defaultShadowChannel}) / 0.29)`,
      lg: `var(--joy-shadowRing, ${defaultShadowRing}), 0.3px 0.8px 1.1px rgba(var(--joy-shadowChannel, ${defaultShadowChannel}) / 0.11), 1.8px 4.5px 6.4px -0.2px rgba(var(--joy-shadowChannel, ${defaultShadowChannel}) / 0.13), 3.2px 7.9px 11.2px -0.4px rgba(var(--joy-shadowChannel, ${defaultShadowChannel}) / 0.16), 4.8px 12px 17px -0.5px rgba(var(--joy-shadowChannel, ${defaultShadowChannel}) / 0.19), 7px 17.5px 24.7px -0.7px rgba(var(--joy-shadowChannel, ${defaultShadowChannel}) / 0.21)`,
      xl: `var(--joy-shadowRing, ${defaultShadowRing}), 0.3px 0.8px 1.1px rgba(var(--joy-shadowChannel, ${defaultShadowChannel}) / 0.11), 1.8px 4.5px 6.4px -0.2px rgba(var(--joy-shadowChannel, ${defaultShadowChannel}) / 0.13), 3.2px 7.9px 11.2px -0.4px rgba(var(--joy-shadowChannel, ${defaultShadowChannel}) / 0.16), 4.8px 12px 17px -0.5px rgba(var(--joy-shadowChannel, ${defaultShadowChannel}) / 0.19), 7px 17.5px 24.7px -0.7px rgba(var(--joy-shadowChannel, ${defaultShadowChannel}) / 0.21), 10.2px 25.5px 36px -0.9px rgba(var(--joy-shadowChannel, ${defaultShadowChannel}) / 0.24), 14.8px 36.8px 52.1px -1.1px rgba(var(--joy-shadowChannel, ${defaultShadowChannel}) / 0.27), 21px 52.3px 74px -1.2px rgba(var(--joy-shadowChannel, ${defaultShadowChannel}) / 0.29)`,
    },
    zIndex: {
      badge: 1,
      table: 10,
      popup: 1000,
      modal: 1300,
      tooltip: 1500,
    },
    typography: {
      display1: {
        fontFamily: `var(--joy-fontFamily-display, ${fontFamily.display})`,
        fontWeight: `var(--joy-fontWeight-xl, ${fontWeight.xl})`,
        fontSize: `var(--joy-fontSize-xl7, ${fontSize.xl7})`,
        lineHeight: `var(--joy-lineHeight-sm, ${lineHeight.sm})`,
        letterSpacing: `var(--joy-letterSpacing-sm, ${letterSpacing.sm})`,
        color: `var(--joy-palette-text-primary, ${lightColorSystem.palette.text.primary})`,
      },
      display2: {
        fontFamily: `var(--joy-fontFamily-display, ${fontFamily.display})`,
        fontWeight: `var(--joy-fontWeight-xl, ${fontWeight.xl})`,
        fontSize: `var(--joy-fontSize-xl6, ${fontSize.xl6})`,
        lineHeight: `var(--joy-lineHeight-sm, ${lineHeight.sm})`,
        letterSpacing: `var(--joy-letterSpacing-sm, ${letterSpacing.sm})`,
        color: `var(--joy-palette-text-primary, ${lightColorSystem.palette.text.primary})`,
      },
      h1: {
        fontFamily: `var(--joy-fontFamily-display, ${fontFamily.display})`,
        fontWeight: `var(--joy-fontWeight-lg, ${fontWeight.lg})`,
        fontSize: `var(--joy-fontSize-xl5, ${fontSize.xl5})`,
        lineHeight: `var(--joy-lineHeight-sm, ${lineHeight.sm})`,
        letterSpacing: `var(--joy-letterSpacing-sm, ${letterSpacing.sm})`,
        color: `var(--joy-palette-text-primary, ${lightColorSystem.palette.text.primary})`,
      },
      h2: {
        fontFamily: `var(--joy-fontFamily-display, ${fontFamily.display})`,
        fontWeight: `var(--joy-fontWeight-lg, ${fontWeight.lg})`,
        fontSize: `var(--joy-fontSize-xl4, ${fontSize.xl4})`,
        lineHeight: `var(--joy-lineHeight-sm, ${lineHeight.sm})`,
        letterSpacing: `var(--joy-letterSpacing-sm, ${letterSpacing.sm})`,
        color: `var(--joy-palette-text-primary, ${lightColorSystem.palette.text.primary})`,
      },
      h3: {
        fontFamily: `var(--joy-fontFamily-body, ${fontFamily.body})`,
        fontWeight: `var(--joy-fontWeight-md, ${fontWeight.md})`,
        fontSize: `var(--joy-fontSize-xl3, ${fontSize.xl3})`,
        lineHeight: `var(--joy-lineHeight-sm, ${lineHeight.sm})`,
        color: `var(--joy-palette-text-primary, ${lightColorSystem.palette.text.primary})`,
      },
      h4: {
        fontFamily: `var(--joy-fontFamily-body, ${fontFamily.body})`,
        fontWeight: `var(--joy-fontWeight-md, ${fontWeight.md})`,
        fontSize: `var(--joy-fontSize-xl2, ${fontSize.xl2})`,
        lineHeight: `var(--joy-lineHeight-md, ${lineHeight.md})`,
        color: `var(--joy-palette-text-primary, ${lightColorSystem.palette.text.primary})`,
      },
      h5: {
        fontFamily: `var(--joy-fontFamily-body, ${fontFamily.body})`,
        fontWeight: `var(--joy-fontWeight-md, ${fontWeight.md})`,
        fontSize: `var(--joy-fontSize-xl, ${fontSize.xl})`,
        lineHeight: `var(--joy-lineHeight-md, ${lineHeight.md})`,
        color: `var(--joy-palette-text-primary, ${lightColorSystem.palette.text.primary})`,
      },
      h6: {
        fontFamily: `var(--joy-fontFamily-body, ${fontFamily.body})`,
        fontWeight: `var(--joy-fontWeight-md, ${fontWeight.md})`,
        fontSize: `var(--joy-fontSize-lg, ${fontSize.lg})`,
        lineHeight: `var(--joy-lineHeight-md, ${lineHeight.md})`,
        color: `var(--joy-palette-text-primary, ${lightColorSystem.palette.text.primary})`,
      },
      body1: {
        fontFamily: `var(--joy-fontFamily-body, ${fontFamily.body})`,
        fontSize: `var(--joy-fontSize-md, ${fontSize.md})`,
        lineHeight: `var(--joy-lineHeight-md, ${lineHeight.md})`,
        color: `var(--joy-palette-text-primary, ${lightColorSystem.palette.text.primary})`,
      },
      body2: {
        fontFamily: `var(--joy-fontFamily-body, ${fontFamily.body})`,
        fontSize: `var(--joy-fontSize-sm, ${fontSize.sm})`,
        lineHeight: `var(--joy-lineHeight-md, ${lineHeight.md})`,
        color: `var(--joy-palette-text-secondary, ${lightColorSystem.palette.text.secondary})`,
      },
      body3: {
        fontFamily: `var(--joy-fontFamily-body, ${fontFamily.body})`,
        fontSize: `var(--joy-fontSize-xs, ${fontSize.xs})`,
        lineHeight: `var(--joy-lineHeight-md, ${lineHeight.md})`,
        color: `var(--joy-palette-text-tertiary, ${lightColorSystem.palette.text.tertiary})`,
      },
      body4: {
        fontFamily: `var(--joy-fontFamily-body, ${fontFamily.body})`,
        fontSize: `var(--joy-fontSize-xs2, ${fontSize.xs2})`,
        lineHeight: `var(--joy-lineHeight-md, ${lineHeight.md})`,
        color: `var(--joy-palette-text-tertiary, ${lightColorSystem.palette.text.tertiary})`,
      },
      body5: {
        fontFamily: `var(--joy-fontFamily-body, ${fontFamily.body})`,
        fontSize: `var(--joy-fontSize-xs3, ${fontSize.xs3})`,
        lineHeight: `var(--joy-lineHeight-md, ${lineHeight.md})`,
        color: `var(--joy-palette-text-tertiary, ${lightColorSystem.palette.text.tertiary})`,
      },
    },
  };
  console.timeEnd('step 1.3');

  if (cssVarPrefix !== 'joy') {
    defaultScales = JSON.parse(
      JSON.stringify(defaultScales).replace(/--joy/g, cssVarPrefix ? `--${cssVarPrefix}` : '-'),
    );
  }

  const { colorSchemes, ...mergedScales } = scalesInput
    ? deepmerge(defaultScales, scalesInput)
    : defaultScales;

  const theme = {
    colorSchemes,
    ...mergedScales,
    breakpoints: createBreakpoints(breakpoints || {}),
    components: deepmerge(
      {
        // TODO: find a way to abstract SvgIcon out of @mui/material
        MuiSvgIcon: {
          defaultProps: {
            fontSize: 'xl',
          },
          styleOverrides: {
            root: ({ ownerState, theme: themeProp }) => {
              const instanceFontSize = ownerState.instanceFontSize as 'inherit' | keyof FontSize;
              return {
                color: 'var(--Icon-color)',
                margin: 'var(--Icon-margin)',
                ...(ownerState.fontSize &&
                  ownerState.fontSize !== 'inherit' && {
                    fontSize: `var(--Icon-fontSize, ${
                      themeProp.vars.fontSize[ownerState.fontSize]
                    })`,
                  }),
                ...(ownerState.color &&
                  ownerState.color !== 'inherit' &&
                  ownerState.color !== 'context' &&
                  themeProp.vars.palette[ownerState.color!] && {
                    color: `rgba(${themeProp.vars.palette[ownerState.color]?.mainChannel} / 1)`,
                  }),
                ...(ownerState.color === 'context' && {
                  color: themeProp.vars.palette.text.secondary,
                }),
                ...(instanceFontSize &&
                  instanceFontSize !== 'inherit' && {
                    '--Icon-fontSize': themeProp.vars.fontSize[instanceFontSize],
                  }),
              };
            },
          },
        },
      } as Components<Theme>,
      componentsInput,
    ),
    cssVarPrefix,
    getCssVar,
    spacing: createSpacing(spacing),
    colorInversionConfig: {
      soft: ['plain', 'outlined', 'soft', 'solid'],
      solid: ['plain', 'outlined', 'soft', 'solid'],
    },
  } as unknown as Theme; // Need type casting due to module augmentation inside the repo

  console.timeEnd('step 1');

  console.time('step 2');
  /**
   Color channels generation
  */
  function attachColorChannels(
    supportedColorScheme: SupportedColorScheme,
    palette: Pick<Palette, ColorPaletteProp>,
  ) {
    (Object.keys(palette) as Array<ColorPaletteProp>).forEach((key) => {
      const channelMapping = {
        main: '500',
        light: '200',
        dark: '800',
      } as const;
      if (supportedColorScheme === 'dark') {
        // @ts-ignore internal
        channelMapping.main = 400;
      }
      if (!palette[key].mainChannel && palette[key][channelMapping.main]) {
        palette[key].mainChannel = colorChannel(palette[key][channelMapping.main]);
      }
      if (!palette[key].lightChannel && palette[key][channelMapping.light]) {
        palette[key].lightChannel = colorChannel(palette[key][channelMapping.light]);
      }
      if (!palette[key].darkChannel && palette[key][channelMapping.dark]) {
        palette[key].darkChannel = colorChannel(palette[key][channelMapping.dark]);
      }
    });
  }
  // Set the channels
  (
    Object.entries(theme.colorSchemes) as Array<
      [SupportedColorScheme, { palette: Pick<Palette, ColorPaletteProp> }]
    >
  ).forEach(([supportedColorScheme, colorSystem]) => {
    attachColorChannels(supportedColorScheme, colorSystem.palette);
  });
  console.timeEnd('step 2');

  console.time('step 3');
  // ===============================================================
  // Create `theme.vars` that contain `var(--*)` as values
  // ===============================================================
  const parserConfig = {
    prefix: cssVarPrefix,
    shouldSkipGeneratingVar,
  };

  const { vars: themeVars, generateCssVars } = prepareCssVars<Theme, ThemeVars>(
    // @ts-ignore property truDark is missing from colorSchemes
    { colorSchemes, ...mergedScales },
    parserConfig,
  );
  console.timeEnd('step 3');
  theme.vars = themeVars;
  theme.generateCssVars = generateCssVars;
  theme.unstable_sxConfig = {
    ...defaultSxConfig,
    ...themeOptions?.unstable_sxConfig,
  };
  theme.unstable_sx = function sx(props: SxProps) {
    return styleFunctionSx({
      sx: props,
      theme: this,
    });
  };
  theme.getColorSchemeSelector = (colorScheme: SupportedColorScheme) =>
    colorScheme === 'light'
      ? '&'
      : `&[data-joy-color-scheme="${colorScheme}"], [data-joy-color-scheme="${colorScheme}"] &`;

  theme.variants = deepmerge(
    createVariants(theme.colorSchemes.light.palette, cssVarPrefix),
    variantsInput,
  );

  theme.palette = {
    ...theme.colorSchemes.light.palette,
    colorScheme: 'light',
  };

  theme.shouldSkipGeneratingVar = shouldSkipGeneratingVar;

  let defaultColorInversion = {
    soft: createSoftInversion(theme),
    solid: createSolidInversion(theme),
  };
  if (cssVarPrefix !== 'joy') {
    defaultColorInversion = JSON.parse(
      JSON.stringify(defaultColorInversion).replace(
        /--joy/g,
        cssVarPrefix ? `--${cssVarPrefix}` : '-',
      ),
    );
  }
  // @ts-ignore if the colorInversion is provided as callbacks, it needs to be resolved in the CssVarsProvider
  theme.colorInversion =
    typeof colorInversionInput === 'function'
      ? colorInversionInput
      : deepmerge(defaultColorInversion, colorInversionInput || {}, { clone: false });

  return theme;
}
