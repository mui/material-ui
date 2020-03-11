import * as React from 'react';
import { Theme } from '../styles/createMuiTheme';
import { TransitionProps } from '../transitions/transition';

export interface ZoomProps extends TransitionProps {
  ref?: React.Ref<unknown>;
  theme?: Theme;
}

/**
 * The Zoom transition can be used for the floating variant of the
[Button](/components/buttons/#floating-action-buttons) component.
It uses [react-transition-group](https://github.com/reactjs/react-transition-group) internally.
 *
 * Demos:
 * - {@link https://material-ui.com/components/transitions Transitions}
 *
 * API:
 * - {@link https://material-ui.com/api/Zoom Zoom API}
 * - inherits {@link https://material-ui.com/api/https://reactcommunity.org/react-transition-group/transition#Transition-props Transition API}
 */
declare const Zoom: React.ComponentType<ZoomProps>;

export default Zoom;
