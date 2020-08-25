import * as React from 'react';
import { Omit, InternalStandardProps as StandardProps } from '..';
import { FadeProps } from '../Fade';
import { TransitionProps } from '../transitions/transition';

export interface BackdropProps
  extends StandardProps<
    React.HTMLAttributes<HTMLDivElement> & Partial<Omit<FadeProps, 'children'>>
  > {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: {
    /** Styles applied to the root element. */
    root?: string;
    /** Styles applied to the root element if `invisible={true}`. */
    invisible?: string;
  };
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

export type BackdropClassKey = keyof NonNullable<BackdropProps['classes']>;

/**
 *
 * Demos:
 *
 * - [Backdrop](https://material-ui.com/components/backdrop/)
 *
 * API:
 *
 * - [Backdrop API](https://material-ui.com/api/backdrop/)
 * - inherits [Fade API](https://material-ui.com/api/fade/)
 */
export default function Backdrop(props: BackdropProps): JSX.Element;
