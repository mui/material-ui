import { Omit } from '..';
import { TransitionProps as _TransitionProps } from 'react-transition-group/Transition';

export type TransitionProps = Omit<_TransitionProps, 'timeout'> & {
  // timeout is required in `react-transition-group`, Material-UI comes with defaults.
  timeout?: _TransitionProps['timeout'];
  // FIXME: @types/react-transition-group/Transition includes the object index, this breaks the `in` prop.
  in?: _TransitionProps['in'];
  // FIXME: Missing from @types/react-transition-group/Transition
  mountOnEnter?: boolean;
  unmountOnExit?: boolean;
}

export type TransitionHandlers = Pick<
  _TransitionProps,
  'onEnter' | 'onEntering' | 'onEntered' | 'onExit' | 'onExiting' | 'onExited'
>;
