import * as React from 'react';
import { StandardProps } from '..';
import { ModalProps } from '../Modal';
import { SlideProps } from '../Slide';
import { PaperProps } from '../Paper';
import { Theme } from '../styles/createMuiTheme';
import { TransitionHandlerProps, TransitionProps } from '../transitions/transition';

export interface DrawerProps
  extends StandardProps<
    ModalProps & Partial<TransitionHandlerProps>,
    DrawerClassKey,
    'open' | 'children'
  > {
  anchor?: 'left' | 'top' | 'right' | 'bottom';
  children?: React.ReactNode;
  elevation?: number;
  ModalProps?: Partial<ModalProps>;
  open?: boolean;
  PaperProps?: Partial<PaperProps>;
  SlideProps?: Partial<SlideProps>;
  theme?: Theme;
  transitionDuration?: TransitionProps['timeout'];
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
declare const Drawer: React.ComponentType<DrawerProps>;

export default Drawer;
