import * as React from 'react';
import { Theme } from '../styles/createMuiTheme';
import { TransitionProps, TransitionTimeout } from './transition';

export interface GrowProps extends TransitionProps {
  theme?: Theme;
  timeout?: TransitionTimeout | 'auto';
}

declare const Grow: React.ComponentType<GrowProps>;

export default Grow;
