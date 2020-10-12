import * as React from 'react';
import { InternalStandardProps as StandardProps } from '..';
import { ModalProps } from '../Modal';
import { SlideProps } from '../Slide';
import { PaperProps } from '../Paper';
import { TransitionHandlerProps, TransitionProps } from '../transitions/transition';

export interface DrawerProps
  extends StandardProps<ModalProps & Partial<TransitionHandlerProps>, 'open' | 'children'> {
  /**
   * Side from which the drawer will appear.
   * @default 'left'
   */
  anchor?: 'left' | 'top' | 'right' | 'bottom';
  /**
   * The contents of the drawer.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: {
    root?: string;
    docked?: string;
    paper?: string;
    paperAnchorLeft?: string;
    paperAnchorRight?: string;
    paperAnchorTop?: string;
    paperAnchorBottom?: string;
    paperAnchorDockedLeft?: string;
    paperAnchorDockedTop?: string;
    paperAnchorDockedRight?: string;
    paperAnchorDockedBottom?: string;
    modal?: string;
  };
  /**
   * The elevation of the drawer.
   * @default 16
   */
  elevation?: number;
  /**
   * Props applied to the [`Modal`](/api/modal/) element.
   * @default {}
   */
  ModalProps?: Partial<ModalProps>;
  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {object} event The event source of the callback.
   */
  onClose?: ModalProps['onClose'];
  /**
   * If `true`, the drawer is open.
   * @default false
   */
  open?: boolean;
  /**
   * Props applied to the [`Paper`](/api/paper/) element.
   * @default {}
   */
  PaperProps?: Partial<PaperProps>;
  /**
   * Props applied to the [`Slide`](/api/slide/) element.
   */
  SlideProps?: Partial<SlideProps>;
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   * @default { enter: duration.enteringScreen, exit: duration.leavingScreen }
   */
  transitionDuration?: TransitionProps['timeout'];
  /**
   * The variant to use.
   * @default 'temporary'
   */
  variant?: 'permanent' | 'persistent' | 'temporary';
}

export type DrawerClassKey = keyof NonNullable<DrawerProps['classes']>;

/**
 * The props of the [Modal](https://material-ui.com/api/modal/) component are available
 * when `variant="temporary"` is set.
 * Demos:
 *
 * - [Drawers](https://material-ui.com/components/drawers/)
 *
 * API:
 *
 * - [Drawer API](https://material-ui.com/api/drawer/)
 */
export default function Drawer(props: DrawerProps): JSX.Element;
