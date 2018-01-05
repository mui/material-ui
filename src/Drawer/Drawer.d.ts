import * as React from 'react';
import { StandardProps } from '..';
import { ModalProps, ModalClassKey } from '../Modal';
import { TransitionDuration, TransitionHandlers } from '../internal/transition';
import { SlideProps } from '../transitions/Slide';
import { Theme } from '../styles/createMuiTheme';

export interface DrawerProps
  extends StandardProps<
      ModalProps & Partial<TransitionHandlers>,
      DrawerClassKey,
      'open' | 'children'
    > {
  anchor?: 'left' | 'top' | 'right' | 'bottom';
  children?: React.ReactNode;
  elevation?: number;
  ModalProps?: Partial<ModalProps>;
  open?: boolean;
  SlideProps?: Partial<SlideProps>;
  theme?: Theme;
  transitionDuration?: TransitionDuration;
  type?: 'permanent' | 'persistent' | 'temporary';
}

export type DrawerClassKey =
  | ModalClassKey
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

declare const Drawer: React.ComponentType<DrawerProps>;

export default Drawer;
