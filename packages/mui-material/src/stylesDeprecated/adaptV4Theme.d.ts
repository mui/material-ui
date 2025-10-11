import { BreakpointsOptions, ShapeOptions, SpacingOptions } from '@mui/system';
import { MixinsOptions } from '../styles/createMixins';
import { Palette, PaletteOptions } from '../styles/createPalette';
import { TypographyVariantsOptions } from '../styles/createTypography';
import { Shadows } from '../styles/shadows';
import { TransitionsOptions } from '../styles/createTransitions';
import { ZIndexOptions } from '../styles/zIndex';
import { ComponentsOverrides } from './overrides';
import { ComponentsVariants } from './variants';
import { ComponentsProps } from './props';
import { Theme } from '../styles/createTheme';

export type Direction = 'ltr' | 'rtl';

export interface DeprecatedThemeOptions {
  shape?: ShapeOptions;
  breakpoints?: BreakpointsOptions;
  direction?: Direction;
  mixins?: MixinsOptions;
  overrides?: ComponentsOverrides;
  palette?: PaletteOptions;
  props?: ComponentsProps;
  shadows?: Shadows;
  spacing?: SpacingOptions;
  transitions?: TransitionsOptions;
  typography?: TypographyVariantsOptions | ((palette: Palette) => TypographyVariantsOptions);
  variants?: ComponentsVariants;
  zIndex?: ZIndexOptions;
  unstable_strictMode?: boolean;
}

/**
 * Generate a theme base on the V4 theme options received.
 * @deprecated Follow the upgrade guide on https://mui.com/r/migration-v4#theme
 * @param options Takes an incomplete theme object and adds the missing parts.
 * @returns A complete, ready-to-use theme object.
 */
export default function adaptV4Theme(options?: DeprecatedThemeOptions): Theme;
