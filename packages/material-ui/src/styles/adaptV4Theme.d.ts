import { BreakpointsOptions, ShapeOptions, SpacingOptions } from '@material-ui/system';
import { MixinsOptions } from './createMixins';
import { Palette, PaletteOptions } from './createPalette';
import { TypographyOptions } from './createTypography';
import { Shadows } from './shadows';
import { TransitionsOptions } from './createTransitions';
import { ZIndexOptions } from './zIndex';
import { ComponentsOverrides } from './overrides';
import { ComponentsVariants } from './variants';
import { ComponentsProps } from './props';
import { Theme } from './createTheme';

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
  typography?: TypographyOptions | ((palette: Palette) => TypographyOptions);
  variants?: ComponentsVariants;
  zIndex?: ZIndexOptions;
  unstable_strictMode?: boolean;
}

/**
 * Generate a theme base on the V4 theme options received.
 * @deprecated Follow the upgrade guide on https://material-ui.com/r/migration-v4#theme
 * @param options Takes an incomplete theme object and adds the missing parts.
 * @returns A complete, ready to use theme object.
 */
export default function adaptV4Theme(options?: DeprecatedThemeOptions): Theme;
