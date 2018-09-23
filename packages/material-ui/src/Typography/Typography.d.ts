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
  | 'colorTextSecondary';

declare const Typography: React.ComponentType<TypographyProps>;

export default Typography;
