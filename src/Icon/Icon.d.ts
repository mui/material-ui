import * as React from 'react';
import { StyledComponent, PropTypes } from '..';

export interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?: PropTypes.Color | 'action' | 'contrast' | 'disabled' | 'error';
}

export default class Icon extends StyledComponent<IconProps> {}
