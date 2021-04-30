import * as React from 'react';
import { Theme } from '../styles/createTheme';
import { TransitionProps } from '../transitions/transition';

export interface SlideProps extends TransitionProps {
  /**
   * A single child content element.
   */
  children?: React.ReactElement<any, any>;
  /**
   * Direction the child node will enter from.
   */
  direction?: 'left' | 'right' | 'up' | 'down';
  /**
   * If `true`, show the component; triggers the enter or exit animation.
   */
  in?: TransitionProps['in'];
  ref?: React.Ref<unknown>;
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   */
  timeout?: TransitionProps['timeout'];
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
export default function Slide(props: SlideProps): JSX.Element;
