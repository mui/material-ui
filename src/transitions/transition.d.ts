import { Omit } from '..';
import { TransitionProps as OriginalTransitionProps } from 'react-transition-group/Transition';

/**
 * TS can not correctly infer props if there is an index signature.
 * By picking only specified props we can work around this issue.
 */
type KeyesTransitionProps = Pick<OriginalTransitionProps, keyof OriginalTransitionProps>

export type TransitionProps = Omit<KeyesTransitionProps, 'timeout'> & {
  timeout?: OriginalTransitionProps['timeout'];
}

export type TransitionHandlers = Pick<
  OriginalTransitionProps,
  'onEnter' | 'onEntering' | 'onEntered' | 'onExit' | 'onExiting' | 'onExited'
>;
