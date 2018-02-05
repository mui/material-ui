import { Omit } from '..';
import { TransitionProps as _TransitionProps } from 'react-transition-group/Transition';

export type TransitionProps = Omit<_TransitionProps, 'timeout'> & {
  // timeout is required in `react-transition-group`, Material-UI comes with defaults.
  timeout?: _TransitionProps['timeout'];
  // FIXME: @types/react-transition-group/Transition includes the object index.
  in?: _TransitionProps['in'];
  mountOnEnter?: _TransitionProps['mountOnEnter'];
  unmountOnExit?: _TransitionProps['unmountOnExit'];
}

export type TransitionHandlers = Pick<
  _TransitionProps,
  'onEnter' | 'onEntering' | 'onEntered' | 'onExit' | 'onExiting' | 'onExited'
>;
