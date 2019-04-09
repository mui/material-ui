import * as React from 'react';
import { StandardProps, PropTypes } from '..';
import { ThemeStyle } from '../styles/createTypography';

type Style = ThemeStyle | 'srOnly';

export interface TypographyProps
  extends StandardProps<React.HTMLAttributes<HTMLElement>, TypographyClassKey> {
  align?: PropTypes.Alignment;
  color?:
    | 'initial'
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'textPrimary'
    | 'textSecondary'
    | 'error';
  component?: React.ElementType<React.HTMLAttributes<HTMLElement>>;
  display?: 'initial' | 'block' | 'inline';
  gutterBottom?: boolean;
  noWrap?: boolean;
  paragraph?: boolean;
  variant?: Style | 'inherit';
  variantMapping?: { [type in Style]: string };
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
  | 'colorError'
  | 'displayInline'
  | 'displayBlock';

declare const Typography: React.ComponentType<TypographyProps>;

export default Typography;
