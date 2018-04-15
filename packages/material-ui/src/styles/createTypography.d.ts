import * as React from 'react';
import { Palette } from './createPalette';

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
  fontFamily: React.CSSProperties['fontFamily'];
  fontSize: React.CSSProperties['fontSize'];
  fontWeightLight: React.CSSProperties['fontWeight'];
  fontWeightRegular: React.CSSProperties['fontWeight'];
  fontWeightMedium: React.CSSProperties['fontWeight'];
  htmlFontSize?: number;
}

export interface TypographyStyle {
  color?: React.CSSProperties['color'];
  fontFamily: React.CSSProperties['fontFamily'];
  fontSize: React.CSSProperties['fontSize'];
  fontWeight: React.CSSProperties['fontWeight'];
  letterSpacing?: React.CSSProperties['letterSpacing'];
  lineHeight?: React.CSSProperties['lineHeight'];
  textTransform?: React.CSSProperties['textTransform'];
}

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
