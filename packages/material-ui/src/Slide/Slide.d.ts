import * as React from 'react';
import { Theme } from '../styles/createMuiTheme';
import { TransitionProps } from '../transitions/transition';

export interface SlideProps extends TransitionProps {
  direction: 'left' | 'right' | 'up' | 'down';
  ref?: React.Ref<unknown>;
  theme?: Theme;
}

/**
 * The Slide transition is used by the [Drawer](/components/drawers/) component.
 * It uses [react-transition-group](https://github.com/reactjs/react-transition-group) internally.
 *
 * Demos:
 * - {@link https://material-ui.com/components/dialogs/ Dialogs}
 * - {@link https://material-ui.com/components/transitions/ Transitions}
 *
 * API:
 * - {@link https://material-ui.com/api/slide/ Slide API}
 * - inherits {@link https://material-ui.comhttps://reactcommunity.org/react-transition-group/transition/#Transition-props Transition API}
 */
declare const Slide: React.ComponentType<SlideProps>;

export default Slide;
