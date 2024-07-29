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
import createThemeWithoutVars from './createThemeWithoutVars';
import createThemeWithVars, {
  CssVarsThemeOptions,
  ColorSystemOptions,
  CssVarsPalette,
  ThemeVars,
  SupportedColorScheme,
} from './createThemeWithVars';

/**
 * To disable custom properties, use module augmentation
 *
 * declare module '@mui/material/styles' {
 *   interface CssThemeVariables {
 *     disabled: true;
 *   }
 * }
 */
export interface CssThemeVariables {}

type CssVarsOptions = CssThemeVariables extends { disabled: true } ? {} : ColorSystemOptions;

export interface ThemeOptions extends Omit<SystemThemeOptions, 'zIndex'>, CssVarsOptions {
  mixins?: MixinsOptions;
  components?: Components<Omit<Theme, 'components'>>;
  palette?: PaletteOptions;
  shadows?: Shadows;
  transitions?: TransitionsOptions;
  typography?: TypographyOptions | ((palette: Palette) => TypographyOptions);
  zIndex?: ZIndexOptions;
  unstable_strictMode?: boolean;
  unstable_sxConfig?: SxConfig;
}

interface BaseTheme extends SystemTheme {
  mixins: Mixins;
  palette: Palette & (CssThemeVariables extends { disabled: true } ? {} : CssVarsPalette);
  shadows: Shadows;
  transitions: Transitions;
  typography: Typography;
  zIndex: ZIndex;
  unstable_strictMode?: boolean;
  vars: CssThemeVariables extends { disabled: true } ? undefined : ThemeVars;
}

export interface Theme extends BaseTheme {
  customProperties?: false;
  defaultColorScheme: SupportedColorScheme;
  components?: Components<BaseTheme>;
  unstable_sx: (props: SxProps<Theme>) => CSSObject;
  unstable_sxConfig: SxConfig;
}

export default function createTheme(
  options: Omit<ThemeOptions, 'components'> &
    Pick<CssVarsThemeOptions, 'defaultColorScheme' | 'colorSchemes' | 'components'> & {
      customProperties?:
        | boolean
        | Pick<
            CssVarsThemeOptions,
            | 'colorSchemeSelector'
            | 'disableCssColorScheme'
            | 'cssVarPrefix'
            | 'shouldSkipGeneratingVar'
          >;
    } = {},
  ...args: object[]
): Theme {
  if (options.customProperties === false) {
    // @ts-expect-error `vars` can be undefined
    return createThemeWithoutVars(options, ...args);
  }

  const {
    palette,
    colorSchemes: initialColorSchemes = !palette ? { light: true } : undefined,
    defaultColorScheme: initialDefaultColorScheme = palette?.mode,
    customProperties,
    ...rest
  } = options;
  const defaultColorSchemeInput = initialDefaultColorScheme || 'light';
  const colorSchemesInput = {
    ...initialColorSchemes,
    ...(palette
      ? {
          [defaultColorSchemeInput]: {
            ...(initialColorSchemes as undefined | Record<'light' | 'dark', any>)?.[
              defaultColorSchemeInput
            ],
            palette,
          },
        }
      : undefined),
  };

  return createThemeWithVars(
    {
      ...rest,
      colorSchemes: colorSchemesInput,
      defaultColorScheme: defaultColorSchemeInput,
      ...(typeof customProperties !== 'boolean' ? customProperties : undefined),
    },
    ...args,
  );
}
