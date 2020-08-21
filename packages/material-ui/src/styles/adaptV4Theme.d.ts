import { BreakpointsOptions } from './createBreakpoints';
import { MixinsOptions } from './createMixins';
import { Palette, PaletteOptions } from './createPalette';
import { TypographyOptions } from './createTypography';
import { Shadows } from './shadows';
import { ShapeOptions } from './shape';
import { SpacingOptions } from './createSpacing';
import { TransitionsOptions } from './transitions';
import { ZIndexOptions } from './zIndex';
import { Overrides } from './overrides';
import { Variants } from './variants';
import { ComponentsProps } from './props';
import { Theme } from './createMuiTheme';

export type Direction = 'ltr' | 'rtl';

export interface DeprecatedThemeOptions {
  shape?: ShapeOptions;
  breakpoints?: BreakpointsOptions;
  direction?: Direction;
  mixins?: MixinsOptions;
  overrides?: Overrides;
  palette?: PaletteOptions;
  props?: ComponentsProps;
  shadows?: Shadows;
  spacing?: SpacingOptions;
  transitions?: TransitionsOptions;
  typography?: TypographyOptions | ((palette: Palette) => TypographyOptions);
  variants?: Variants;
  zIndex?: ZIndexOptions;
  unstable_strictMode?: boolean;
}

/**
 * Generate a theme base on the V4 theme options received.
 *
 * @param options Takes an incomplete theme object and adds the missing parts.
 * @returns A complete, ready to use theme object.
 */
export default function adaptV4Theme(
  options?: DeprecatedThemeOptions,
): Theme;
