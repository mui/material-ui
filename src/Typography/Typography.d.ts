import * as React from 'react';
import { StyledComponent, PropTypes } from '..';
import { Style, TextStyle } from '../styles/createTypography';

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  align?: PropTypes.Alignment;
  component?: React.ReactType;
  color?: PropTypes.Color | 'secondary' | 'error';
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
  | 'colorAccent'
  ;

declare const Typography: StyledComponent<TypographyProps, TypographyClassKey>;

export default Typography;
