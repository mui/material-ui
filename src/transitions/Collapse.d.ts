import * as React from 'react';
import { StyledComponent } from '..';
import { Theme } from '../styles/theme';
import { TransitionProps } from '../internal/Transition';

export interface CollapseProps extends TransitionProps {
  theme?: Theme;
  transitionDuration?: number | string;
}

export default class Collapse extends StyledComponent<CollapseProps> {}
