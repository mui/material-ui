import * as React from 'react';
import { StandardProps } from '..';
import { ModalProps, ModalClassKey } from '../Modal';
import { TransitionDuration } from '../internal/transition';
import { SlideProps } from '../transitions/Slide';
import { Theme } from '../styles/createMuiTheme';

export interface DrawerProps extends StandardProps<
  ModalProps,
  DrawerClassKey
> {
  anchor?: 'left' | 'top' | 'right' | 'bottom';
  elevation?: number;
  ModalProps?: ModalProps
  open?: boolean;
  SlideProps?: SlideProps;
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
  | 'modal'
  ;

declare const Drawer: React.ComponentType<DrawerProps>;

export default Drawer;
