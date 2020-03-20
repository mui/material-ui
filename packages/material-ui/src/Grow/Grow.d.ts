import * as React from 'react';
import { Omit } from '@material-ui/types';
import { Theme } from '../styles/createMuiTheme';
import { TransitionProps } from '../transitions/transition';

export interface GrowProps extends Omit<TransitionProps, 'timeout'> {
  ref?: React.Ref<unknown>;
  theme?: Theme;
  timeout?: TransitionProps['timeout'] | 'auto';
}

/**
 * The Grow transition is used by the [Tooltip](https://material-ui.com/components/tooltips/) and
 * [Popover](https://material-ui.com/components/popover/) components.
 * It uses [react-transition-group](https://github.com/reactjs/react-transition-group) internally.
 * Demos:
 *
 * - [Popover](https://material-ui.com/components/popover/)
 * - [Transitions](https://material-ui.com/components/transitions/)
 *
 * API:
 *
 * - [Grow API](https://material-ui.com/api/grow/)
 * - inherits [Transition API](https://reactcommunity.org/react-transition-group/transition#Transition-props)
 */
declare const Grow: React.ComponentType<GrowProps>;

export default Grow;
