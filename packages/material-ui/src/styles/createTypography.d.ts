import { Palette } from './createPalette';
import { CSSProperties } from './withStyles';

export type Variant =
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

export interface FontStyle
  extends Required<{
    fontFamily: CSSProperties['fontFamily'];
    fontSize: number;
    fontWeightLight: CSSProperties['fontWeight'];
    fontWeightRegular: CSSProperties['fontWeight'];
    fontWeightMedium: CSSProperties['fontWeight'];
    fontWeightBold: CSSProperties['fontWeight'];
  }> {}

export interface FontStyleOptions extends Partial<FontStyle> {
  htmlFontSize?: number;
  allVariants?: CSSProperties;
}

// TODO: which one should actually be allowed to be subject to module augmentation?
// current type vs interface decision is kept for historical reasons until we
// made a decision
export type TypographyStyle = CSSProperties;
export interface TypographyStyleOptions extends TypographyStyle {}

export interface TypographyUtils {
  pxToRem: (px: number) => string;
}

export interface Typography extends Record<Variant, TypographyStyle>, FontStyle, TypographyUtils {}

export interface TypographyOptions
  extends Partial<Record<Variant, TypographyStyleOptions> & FontStyleOptions> {}

export default function createTypography(
  palette: Palette,
  typography: TypographyOptions | ((palette: Palette) => TypographyOptions),
): Typography;
