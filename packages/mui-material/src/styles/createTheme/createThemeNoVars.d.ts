import {
  ThemeOptions as SystemThemeOptions,
  Theme as SystemTheme,
  SxProps,
  CSSObject,
  SxConfig,
} from '@mui/system';
import { Mixins, MixinsOptions } from '../createMixins';
import { Palette, PaletteOptions } from '../createPalette';
import { Typography, TypographyOptions } from '../createTypography';
import { Shadows } from '../shadows';
import { Transitions, TransitionsOptions } from '../createTransitions';
import { ZIndex, ZIndexOptions } from '../zIndex';
import { Components } from '../components';
import {
  CssVarsPalette,
  ColorSystemOptions,
  ColorSystem,
  ThemeVars,
  SupportedColorScheme,
} from './createThemeWithVars';

/**
 * To disable custom properties, use module augmentation
 *
 * @example
 * declare module '@mui/material/styles' {
 *   interface CssThemeVariables {
 *     disabled: true;
 *   }
 * }
 */
export interface CssThemeVariables {}

type CssVarsOptions<CustomProperties = CssThemeVariables> = CustomProperties extends {
  disabled: true;
}
  ? {}
  : ColorSystemOptions;

export interface ThemeOptions<CustomProperties = CssThemeVariables>
  extends Omit<SystemThemeOptions, 'zIndex'>,
    CssVarsOptions {
  mixins?: MixinsOptions;
  components?: Components<Omit<Theme<CustomProperties>, 'components'>>;
  palette?: PaletteOptions;
  shadows?: Shadows;
  transitions?: TransitionsOptions;
  typography?: TypographyOptions | ((palette: Palette) => TypographyOptions);
  zIndex?: ZIndexOptions;
  unstable_strictMode?: boolean;
  unstable_sxConfig?: SxConfig;
}

interface BaseTheme<CustomProperties = CssThemeVariables> extends SystemTheme {
  mixins: Mixins;
  palette: Palette & (CustomProperties extends { disabled: true } ? {} : CssVarsPalette);
  shadows: Shadows;
  transitions: Transitions;
  typography: Typography;
  zIndex: ZIndex;
  unstable_strictMode?: boolean;
  vars: CssThemeVariables extends { disabled: true } ? undefined : ThemeVars;
}

// shut off automatic exporting for the `BaseTheme` above
export {};

/**
 * Our [TypeScript guide on theme customization](https://mui.com/material-ui/guides/typescript/#customization-of-theme) explains in detail how you would add custom properties.
 */
export interface Theme<CustomProperties = CssThemeVariables> extends BaseTheme {
  colorSchemes?: Partial<
    Record<
      SupportedColorScheme,
      CustomProperties extends { disabled: true } ? { palette: Palette } : ColorSystem
    >
  >;
  defaultColorScheme: SupportedColorScheme;
  customProperties?: false;
  components?: Components<BaseTheme>;
  unstable_sx: (props: SxProps<Theme>) => CSSObject;
  unstable_sxConfig: SxConfig;
}

/**
 * Generate a theme base on the options received.
 * @param options Takes an incomplete theme object and adds the missing parts.
 * @param args Deep merge the arguments with the about to be returned theme.
 * @returns A complete, ready-to-use theme object.
 */
export default function createThemeNoVars(options?: ThemeOptions, ...args: object[]): Theme;
