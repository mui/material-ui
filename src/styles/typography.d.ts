import { Palette } from './palette';

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

export interface FontStyle {
  fontFamily: string;
  fontSize: number | string;
  fontWeightLight: number | string;
  fontWeightRegular: number | string;
  fontWeightMedium: number | string;
}

export interface TypographyStyle {
  color: string;
  fontFamily: string;
  fontSize: number | string;
  fontWeight: number | string;
  letterSpacing: string;
  lineHeight: number | string;
}

export type Typography = { [type in Style]: TypographyStyle } & FontStyle;

export default function createTypography(
  palette: Palette,
  constants?: FontStyle
): Typography;
