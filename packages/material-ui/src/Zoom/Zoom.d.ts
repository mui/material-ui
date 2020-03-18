import * as React from 'react';
import { Theme } from '../styles/createMuiTheme';
import { TransitionProps } from '../transitions/transition';

export interface ZoomProps extends TransitionProps {
  ref?: React.Ref<unknown>;
  theme?: Theme;
}

/**
 * The Zoom transition can be used for the floating variant of the
 * [Button](https://material-ui.com/components/buttons/#floating-action-buttons) component.
 * It uses [react-transition-group](https://github.com/reactjs/react-transition-group) internally.
 * Demos:
 *
 * - [Transitions](https://material-ui.com/components/transitions/)
 *
 * API:
 *
 * - [Zoom API](https://material-ui.com/api/zoom/)
 * - inherits [Transition API](https://reactcommunity.org/react-transition-group/transition#Transition-props)
 */
declare const Zoom: React.ComponentType<ZoomProps>;

export default Zoom;
