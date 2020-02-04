import * as React from 'react';
import { Theme } from '../styles/createMuiTheme';
import { TransitionProps } from '../transitions/transition';

export interface SlideProps extends TransitionProps {
  direction: 'left' | 'right' | 'up' | 'down';
  ref?: React.Ref<unknown>;
  theme?: Theme;
}

declare const Slide: React.ComponentType<SlideProps>;

export default Slide;
