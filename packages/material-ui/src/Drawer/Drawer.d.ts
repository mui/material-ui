import * as React from 'react';
import { StandardProps } from '..';
import { ModalProps } from '../Modal';
import { SlideProps } from '../Slide';
import { PaperProps } from '../Paper';
import { Theme } from '../styles/createTheme';
import { TransitionHandlerProps, TransitionProps } from '../transitions/transition';

export interface DrawerProps
  extends StandardProps<
    ModalProps & Partial<TransitionHandlerProps>,
    DrawerClassKey,
    'open' | 'children'
  > {
  /**
   * Side from which the drawer will appear.
   */
  anchor?: 'left' | 'top' | 'right' | 'bottom';
  /**
   * The contents of the drawer.
   */
  children?: React.ReactNode;
  /**
   * The elevation of the drawer.
   */
  elevation?: number;
  /**
   * Props applied to the [`Modal`](/api/modal/) element.
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
   */
  open?: boolean;
  /**
   * Props applied to the [`Paper`](/api/paper/) element.
   */
  PaperProps?: Partial<PaperProps>;
  /**
   * Props applied to the [`Slide`](/api/slide/) element.
   */
  SlideProps?: Partial<SlideProps>;
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   */
  transitionDuration?: TransitionProps['timeout'];
  /**
   * The variant to use.
   */
  variant?: 'permanent' | 'persistent' | 'temporary';
}

export type DrawerClassKey =
  | 'root'
  | 'docked'
  | 'paper'
  | 'paperAnchorLeft'
  | 'paperAnchorRight'
  | 'paperAnchorTop'
  | 'paperAnchorBottom'
  | 'paperAnchorDockedLeft'
  | 'paperAnchorDockedTop'
  | 'paperAnchorDockedRight'
  | 'paperAnchorDockedBottom'
  | 'modal';

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
