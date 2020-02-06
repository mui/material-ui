import * as React from 'react';
import { StandardProps, PropTypes } from '..';
import { OverrideProps, OverridableTypeMap, OverridableComponent } from '../OverridableComponent';
import { Variant as ThemeVariant } from '../styles/createTypography';

type Variant = ThemeVariant | 'srOnly';

export interface TypographyTypeMap<P = {}, D extends React.ElementType = 'span'> {
  props: P & {
    align?: PropTypes.Alignment;
    color?:
      | 'initial'
      | 'inherit'
      | 'primary'
      | 'secondary'
      | 'textPrimary'
      | 'textSecondary'
      | 'error';
    display?: 'initial' | 'block' | 'inline';
    gutterBottom?: boolean;
    noWrap?: boolean;
    paragraph?: boolean;
    variant?: Variant | 'inherit';
    variantMapping?: Partial<Record<Variant, string>>;
  };
  defaultComponent: D;
  classKey: TypographyClassKey;
}

declare const Typography: OverridableComponent<TypographyTypeMap>;

export type TypographyProps<
  D extends React.ElementType = TypographyTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<TypographyTypeMap<P, D>, D>;

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
  | 'colorPrimary'
  | 'colorSecondary'
  | 'colorTextPrimary'
  | 'colorTextSecondary'
  | 'colorError'
  | 'displayInline'
  | 'displayBlock';

export default Typography;
