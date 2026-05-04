import * as React from 'react';
import { CSSProperties } from './createMixins';
import { Palette } from './createPalette';

export type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'subtitle1'
  | 'subtitle2'
  | 'body1'
  | 'body2'
  | 'caption'
  | 'button'
  | 'overline';

export interface FontStyle {
  fontFamily: React.CSSProperties['fontFamily'];
  fontSize: number;
  fontWeightLight: React.CSSProperties['fontWeight'];
  fontWeightRegular: React.CSSProperties['fontWeight'];
  fontWeightMedium: React.CSSProperties['fontWeight'];
  fontWeightBold: React.CSSProperties['fontWeight'];
  htmlFontSize: number;
}

export interface FontStyleOptions extends Partial<FontStyle> {
  allVariants?: React.CSSProperties | undefined;
  /**
   * Apply the letter spacing values tuned for Roboto even when a custom `fontFamily` is set.
   * Useful when the font is Roboto but referenced via a CSS variable (e.g. `var(--font-roboto)`).
   * Defaults to `true` when `fontFamily` matches the default Roboto stack.
   */
  applyRobotoLetterSpacing?: boolean;
}

// TODO: which one should actually be allowed to be subject to module augmentation?
// current type vs interface decision is kept for historical reasons until we
// made a decision
export type TypographyStyle = CSSProperties;
export interface TypographyStyleOptions extends TypographyStyle {}

export interface TypographyUtils {
  pxToRem: (px: number) => string;
}

export interface TypographyVariants
  extends Record<TypographyVariant, TypographyStyle>, FontStyle, TypographyUtils {}

export interface TypographyVariantsOptions extends Partial<
  Record<TypographyVariant, TypographyStyleOptions> & FontStyleOptions
> {}

export default function createTypography(
  palette: Palette,
  typography: TypographyVariantsOptions | ((palette: Palette) => TypographyVariantsOptions),
): TypographyVariants;
