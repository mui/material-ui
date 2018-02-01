import * as React from 'react';
import { Theme } from '../styles/createMuiTheme';
import { TransitionProps, TransitionTimeout } from './transition';

export interface SlideProps extends TransitionProps {
  direction: 'left' | 'right' | 'up' | 'down';
  theme?: Theme;
  timeout?: TransitionTimeout;
}

declare const Slide: React.ComponentType<SlideProps>;

export default Slide;
