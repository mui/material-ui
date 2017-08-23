import * as React from 'react';
import { StyledComponent } from '..';
import { Theme } from '../styles/theme';
import { TransitionProps } from '../internal/Transition';

export interface SlideProps extends TransitionProps {
  direction?: 'left' | 'right' | 'up' | 'down';
  offset?: string;
  theme?: Theme;
  enterTransitionDuration?: number;
  leaveTransitionDuration?: number;
}

export default class Slide extends StyledComponent<SlideProps> {}
