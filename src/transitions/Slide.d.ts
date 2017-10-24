import * as React from 'react';
import { Theme } from '../styles/createMuiTheme';
import { TransitionDuration, TransitionProps } from '../internal/transition';

export interface SlideProps extends TransitionProps {
  direction?: 'left' | 'right' | 'up' | 'down';
  theme?: Theme;
  timeout?: TransitionDuration;
}

declare const Slide: React.ComponentType<SlideProps>;

export default Slide;
