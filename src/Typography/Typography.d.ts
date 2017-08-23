import * as React from 'react';
import { StyledComponent, PropTypes } from '..';
import { Style, TextStyle } from '../styles/typography';

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  align?: PropTypes.Alignment;
  component?: React.ReactNode;
  color?: PropTypes.Color | 'secondary';
  gutterBottom?: boolean;
  headlineMapping?: { [type in TextStyle]: string };
  noWrap?: boolean;
  paragraph?: boolean;
  type?: Style | 'caption' | 'button';
}

export default class Typography extends StyledComponent<TypographyProps> {}
