import * as React from 'react';
import { StyledComponent } from '..';
import { Theme } from '../styles/createMuiTheme';
import { TransitionProps } from '../internal/Transition';

export interface SlideProps extends TransitionProps {
  direction?: 'left' | 'right' | 'up' | 'down';
  offset?: string;
  theme?: Theme;
  enterTransitionDuration?: number;
  leaveTransitionDuration?: number;
}

export type SlideClassKey = never;

declare const Slide: StyledComponent<SlideProps, SlideClassKey>;

export default Slide;
