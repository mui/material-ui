import * as React from 'react';
import { Omit, StandardProps } from '..';
import { FadeProps } from '../Fade';
import { TransitionProps } from '../transitions/transition';

export interface BackdropProps
  extends StandardProps<
    React.HTMLAttributes<HTMLDivElement> & Partial<Omit<FadeProps, 'children'>>,
    BackdropClassKey
  > {
  /**
   * If `true`, the backdrop is invisible.
   * It can be used when rendering a popover or a custom select component.
   */
  invisible?: boolean;
  /**
   * If `true`, the backdrop is open.
   */
  open: boolean;
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   */
  transitionDuration?: TransitionProps['timeout'];
}

export type BackdropClassKey = 'root' | 'invisible';

/**
 *
 * Demos:
 *
 * - [Backdrop](https://material-ui.com/components/backdrop/)
 *
 * API:
 *
 * - [Backdrop API](https://material-ui.com/api/backdrop/)
 */
export default function Backdrop(props: BackdropProps): JSX.Element;
