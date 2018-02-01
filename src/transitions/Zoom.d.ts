import * as React from 'react';
import { Theme } from '../styles/createMuiTheme';
import { TransitionProps, TransitionTimeout } from './transition';

export interface ZoomProps extends TransitionProps {
  timeout?: TransitionTimeout;
  theme?: Theme;
}

declare const Zoom: React.ComponentType<ZoomProps>;

export default Zoom;
