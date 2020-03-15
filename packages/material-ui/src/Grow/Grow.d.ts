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
 * The Grow transition is used by the [Tooltip](/components/tooltips/) and
 * [Popover](/components/popover/) components.
 * It uses [react-transition-group](https://github.com/reactjs/react-transition-group) internally.
 *
 * Demos:
 * - {@link https://material-ui.com/components/popover/ Popover}
 * - {@link https://material-ui.com/components/transitions/ Transitions}
 *
 * API:
 * - {@link https://material-ui.com/api/grow/ Grow API}
 * - inherits {@link https://material-ui.comhttps://reactcommunity.org/react-transition-group/transition/#Transition-props Transition API}
 */
declare const Grow: React.ComponentType<GrowProps>;

export default Grow;
