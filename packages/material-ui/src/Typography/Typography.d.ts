import * as React from 'react';
import { StandardProps, PropTypes } from '..';
import { ThemeStyle } from '../styles/createTypography';

type Style = ThemeStyle | 'srOnly';

export interface TypographyProps
  extends StandardProps<React.HTMLAttributes<HTMLElement>, TypographyClassKey> {
  align?: PropTypes.Alignment;
  color?: PropTypes.Color | 'textPrimary' | 'textSecondary' | 'error';
  component?: React.ReactType<TypographyProps>;
  gutterBottom?: boolean;
  headlineMapping?: { [type in Style]: string };
  noWrap?: boolean;
  paragraph?: boolean;
  variant?: Style | 'inherit';
}

export type TypographyClassKey =
  | 'root'
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
  | 'srOnly'
  | 'alignLeft'
  | 'alignCenter'
  | 'alignRight'
  | 'alignJustify'
  | 'noWrap'
  | 'gutterBottom'
  | 'paragraph'
  | 'colorInherit'
  | 'colorSecondary'
  | 'colorTextSecondary'
  | 'display4' // deprecated
  | 'display3'
  | 'display2'
  | 'display1'
  | 'headline'
  | 'title'
  | 'subheading';

declare const Typography: React.ComponentType<TypographyProps>;

export default Typography;
