import * as React from 'react';
import { Theme } from '../styles/createMuiTheme';
import { TransitionProps, TransitionDuration } from './transition';

export interface GrowProps extends TransitionProps {
  theme?: Theme;
  timeout?: TransitionDuration;
}

declare const Grow: React.ComponentType<GrowProps>;

export default Grow;
