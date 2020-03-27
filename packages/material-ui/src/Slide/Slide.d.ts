import * as React from 'react';
import { Theme } from '../styles/createMuiTheme';
import { TransitionProps } from '../transitions/transition';

export interface SlideProps extends TransitionProps {
  children?: React.ReactElement<any, any>;
  direction: 'left' | 'right' | 'up' | 'down';
  ref?: React.Ref<unknown>;
  theme?: Theme;
}

/**
 * The Slide transition is used by the [Drawer](https://material-ui.com/components/drawers/) component.
 * It uses [react-transition-group](https://github.com/reactjs/react-transition-group) internally.
 * Demos:
 *
 * - [Dialogs](https://material-ui.com/components/dialogs/)
 * - [Transitions](https://material-ui.com/components/transitions/)
 *
 * API:
 *
 * - [Slide API](https://material-ui.com/api/slide/)
 * - inherits [Transition API](https://reactcommunity.org/react-transition-group/transition#Transition-props)
 */
declare const Slide: React.ComponentType<SlideProps>;

export default Slide;
