import { Omit } from '..';
import { TransitionProps } from 'react-transition-group/Transition';


export interface TransitionProps extends Omit<TransitionProps, 'timeout'> {
  in?: TransitionProps['in'];
  // FIXME: Missing from @types/react-transition-group/Transition
  mountOnEnter?: boolean;
  unmountOnExit?: boolean;
}

export type TransitionTimeout = TransitionProps['timeout'];
export type TransitionDuration = TransitionTimeout | 'auto';

export type TransitionHandlers = Pick<
  TransitionProps,
  'onEnter' | 'onEntering' | 'onEntered' | 'onExit' | 'onExiting' | 'onExited'
>;