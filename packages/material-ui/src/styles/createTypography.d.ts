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

export interface FontStyle extends Required<{
  fontFamily: CSSProperties['fontFamily'];
  fontSize: number;
  fontWeightLight: CSSProperties['fontWeight'];
  fontWeightRegular: CSSProperties['fontWeight'];
  fontWeightMedium: CSSProperties['fontWeight'];
  htmlFontSize?: number;
}> {}

export type TypographyStyle =
  & Required<Pick<CSSProperties, 'fontFamily' | 'fontSize' | 'fontWeight' | 'color'>>
  & Partial<Pick<CSSProperties, 'letterSpacing' | 'lineHeight' | 'textTransform'>>
  ;

export interface TypographyUtils {
  pxToRem: (px: number) => string;
}

export type Typography = Record<Style, TypographyStyle> & FontStyle & TypographyUtils;

export type TypographyOptions = Partial<Record<Style, Partial<TypographyStyle>> & FontStyle>;

//export type TypographyOptions = DeepPartial<Typography>;

export default function createTypography(
  palette: Palette,
  typography: TypographyOptions | ((palette: Palette) => TypographyOptions),
): Typography;
