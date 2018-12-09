import { Palette } from './createPalette';
import { Overwrite, Omit } from '..';
import { CSSProperties } from './withStyles';

export type ThemeStyle =
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
  | 'overline'
  | 'display4' // deprecated
  | 'display3'
  | 'display2'
  | 'display1'
  | 'headline'
  | 'title'
  | 'subheading';

export interface FontStyle
  extends Required<{
    fontFamily: CSSProperties['fontFamily'];
    fontSize: number;
    fontWeightLight: CSSProperties['fontWeight'];
    fontWeightRegular: CSSProperties['fontWeight'];
    fontWeightMedium: CSSProperties['fontWeight'];
  }> {}

export interface FontStyleOptions extends Partial<FontStyle> {
  htmlFontSize?: number;
  allVariants?: CSSProperties;
  useNextVariants?: boolean;
}

export type TypographyStyle = Required<
  Pick<CSSProperties, 'fontFamily' | 'fontSize' | 'fontWeight' | 'color'>
> &
  Partial<Pick<CSSProperties, 'letterSpacing' | 'lineHeight' | 'textTransform'>>;

export interface TypographyStyleOptions extends Partial<TypographyStyle> {}

export interface TypographyUtils {
  pxToRem: (px: number) => string;
}

export interface Typography
  extends Record<ThemeStyle, TypographyStyle>,
    FontStyle,
    TypographyUtils {}

export interface TypographyOptions
  extends Partial<Record<ThemeStyle, TypographyStyleOptions> & FontStyleOptions> {}

export default function createTypography(
  palette: Palette,
  typography: TypographyOptions | ((palette: Palette) => TypographyOptions),
): Typography;
