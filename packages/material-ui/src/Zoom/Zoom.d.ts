import * as React from 'react';
import { Theme } from '../styles/createMuiTheme';
import { TransitionProps } from '../transitions/transition';

export interface ZoomProps extends TransitionProps {
  ref?: React.Ref<unknown>;
  theme?: Theme;
}

declare const Zoom: React.ComponentType<ZoomProps>;

export default Zoom;
