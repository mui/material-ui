import * as React from 'react';
import { Theme } from '../styles/createMuiTheme';
import { TransitionDuration, TransitionProps } from '../internal/transition';

export interface GrowProps extends TransitionProps {
  theme?: Theme;
  timeout?: TransitionDuration | 'auto';
}

declare const Grow: React.ComponentType<GrowProps>;

export default Grow;
