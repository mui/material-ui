import { Palette } from './createPalette';
import { Overwrite, Omit } from '..';
import { CSSProperties } from './withStyles';

export type TextStyle =
  | 'display1'
  | 'display2'
  | 'display3'
  | 'display4'
  | 'headline'
  | 'title'
  | 'subheading'
  | 'body1'
  | 'body2'
  | 'caption';

export type Style = TextStyle | 'button';

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
}

export type TypographyStyle = Required<
  Pick<CSSProperties, 'fontFamily' | 'fontSize' | 'fontWeight' | 'color'>
> &
  Partial<Pick<CSSProperties, 'letterSpacing' | 'lineHeight' | 'textTransform'>>;

export interface TypographyStyleOptions extends Partial<TypographyStyle> {}

export interface TypographyUtils {
  pxToRem: (px: number) => string;
}

export interface Typography extends Record<Style, TypographyStyle>, FontStyle, TypographyUtils {}

export interface TypographyOptions
  extends Partial<Record<Style, TypographyStyleOptions> & FontStyleOptions> {}

export default function createTypography(
  palette: Palette,
  typography: TypographyOptions | ((palette: Palette) => TypographyOptions),
): Typography;
