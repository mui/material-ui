import * as React from 'react';
import { Style, TextStyle } from '../styles/createTypography';
import { Alignment, Color, StandardProps } from '../MuiProps';

export interface TypographyProps
  extends StandardProps<React.HTMLAttributes<HTMLElement>, TypographyClassKey> {
  align?: Alignment;
  color?: Color | 'secondary' | 'error';
  component?: string | React.ComponentType<TypographyProps>;
  gutterBottom?: boolean;
  headlineMapping?: { [type in TextStyle]: string };
  noWrap?: boolean;
  paragraph?: boolean;
  type?: Style | 'caption' | 'button';
}

export type TypographyClassKey =
  | 'root'
  | 'display4'
  | 'display3'
  | 'display2'
  | 'display1'
  | 'headline'
  | 'title'
  | 'subheading'
  | 'body2'
  | 'body1'
  | 'caption'
  | 'button'
  | 'alignLeft'
  | 'alignCenter'
  | 'alignRight'
  | 'alignJustify'
  | 'noWrap'
  | 'gutterBottom'
  | 'paragraph'
  | 'colorInherit'
  | 'colorSecondary'
  | 'colorAccent';

declare const Typography: React.ComponentType<TypographyProps>;

export default Typography;
