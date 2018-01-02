import * as React from 'react';
import { Theme } from '../styles/createMuiTheme';
import { TransitionDuration, TransitionProps } from '../internal/transition';

export interface ZoomProps extends TransitionProps {
  theme?: Theme;
  timeout?: TransitionDuration;
}

declare const Zoom: React.ComponentType<ZoomProps>;

export default Zoom;
