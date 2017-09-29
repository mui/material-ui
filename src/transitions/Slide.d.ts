import * as React from 'react';
import { StyledComponent } from '..';
import { Theme } from '../styles/createMuiTheme';
import { TransitionDuration, TransitionProps } from '../internal/Transition';

export interface SlideProps extends TransitionProps {
  direction?: 'left' | 'right' | 'up' | 'down';
  offset?: string;
  theme?: Theme;
  transitionDuration?: TransitionDuration;
}

declare const Slide: React.ComponentType<SlideProps>;

export default Slide;
