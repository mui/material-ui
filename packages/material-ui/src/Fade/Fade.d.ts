import * as React from 'react';
import { Theme } from '../styles/createMuiTheme';
import { TransitionProps } from '../transitions/transition';

export interface FadeProps extends TransitionProps {
  ref?: React.Ref<unknown>;
  theme?: Theme;
}

/**
 * The Fade transition is used by the [Modal](/components/modal/) component.
 * It uses [react-transition-group](https://github.com/reactjs/react-transition-group) internally.
 *
 * Demos:
 * - {@link https://material-ui.com/components/transitions/ Transitions}
 *
 * API:
 * - {@link https://material-ui.com/api/fade/ Fade API}
 * - inherits {@link https://material-ui.comhttps://reactcommunity.org/react-transition-group/transition/#Transition-props Transition API}
 */
declare const Fade: React.ComponentType<FadeProps>;

export default Fade;
