import { type BreakpointsOptions, type ShapeOptions, type SpacingOptions } from '@mui/system';
import { type MixinsOptions } from './createMixins';
import { type Palette, type PaletteOptions } from './createPalette';
import { type TypographyVariantsOptions } from './createTypography';
import { type Shadows } from './shadows';
import { type TransitionsOptions } from './createTransitions';
import { type ZIndexOptions } from './zIndex';
import { type ComponentsOverrides } from './overrides';
import { type ComponentsVariants } from './variants';
import { type ComponentsProps } from './props';
import { type Theme } from './createTheme';

export type Direction = 'ltr' | 'rtl';

export interface DeprecatedThemeOptions {
  shape?: ShapeOptions | undefined;
  breakpoints?: BreakpointsOptions | undefined;
  direction?: Direction | undefined;
  mixins?: MixinsOptions | undefined;
  overrides?: ComponentsOverrides | undefined;
  palette?: PaletteOptions | undefined;
  props?: ComponentsProps | undefined;
  shadows?: Shadows | undefined;
  spacing?: SpacingOptions | undefined;
  transitions?: TransitionsOptions | undefined;
  typography?:
    TypographyVariantsOptions | ((palette: Palette) => TypographyVariantsOptions) | undefined;
  variants?: ComponentsVariants | undefined;
  zIndex?: ZIndexOptions | undefined;
  unstable_strictMode?: boolean | undefined;
}

/**
 * Generate a theme base on the V4 theme options received.
 * @deprecated Follow the upgrade guide on https://mui.com/r/migration-v4#theme
 * @param options Takes an incomplete theme object and adds the missing parts.
 * @returns A complete, ready-to-use theme object.
 */
export default function adaptV4Theme(options?: DeprecatedThemeOptions): Theme;
