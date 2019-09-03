import * as React from 'react';
import { StandardProps } from '@material-ui/core';
import { ButtonProps } from '@material-ui/core/Button';
import { TransitionProps } from 'react-transition-group/Transition';
import { TransitionHandlerProps } from '@material-ui/core/transitions';

export interface SpeedDialProps
  extends StandardProps<
    React.HTMLAttributes<HTMLDivElement> & Partial<TransitionHandlerProps>,
    SpeedDialClassKey,
    'children'
  > {
  /**
   * SpeedDialActions to display when the SpeedDial is `open`.
   */
  children?: React.ReactNode;
  /**
   * The aria-label of the `Button` element.
   * Also used to provide the `id` for the `SpeedDial` element and its children.
   */
  ariaLabel: string;
  /**
   * Props applied to the [`Button`](/api/button/) element.
   */
  ButtonProps?: Partial<ButtonProps>;
  /**
   * The direction the actions open relative to the floating action button.
   */
  direction?: 'up' | 'down' | 'left' | 'right';
  /**
   * If `true`, the SpeedDial will be hidden.
   */
  hidden?: boolean;
  /**
   * The icon to display in the SpeedDial Floating Action Button. The `SpeedDialIcon` component
   * provides a default Icon with animation.
   */
  icon?: React.ReactNode;
  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {object} event The event source of the callback.
   * @param {string} key The key pressed.
   */
  onClose?: (event: React.SyntheticEvent<{}>, key: string) => void;
  /**
   * If `true`, the SpeedDial is open.
   */
  open: boolean;
  /**
   * The icon to display in the SpeedDial Floating Action Button when the SpeedDial is open.
   */
  openIcon?: React.ReactNode;
  /**
   * The component used for the transition.
   */
  TransitionComponent?: React.ComponentType<TransitionProps>;
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   */
  transitionDuration?: TransitionProps['timeout'];
  /**
   * Props applied to the `Transition` element.
   */
  TransitionProps?: TransitionProps;
}

export type SpeedDialClassKey =
  | 'root'
  | 'actions'
  | 'actionsClosed'
  | 'fab'
  | 'directionUp'
  | 'directionDown'
  | 'directionLeft'
  | 'directionRight';

export default function SpeedDial(props: SpeedDialProps): JSX.Element;
