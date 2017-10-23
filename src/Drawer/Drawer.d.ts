import * as React from 'react';
import { StandardProps } from '..';
import { ModalProps, ModalClassKey } from '../internal/Modal';
import { TransitionDuration } from '../internal/transition';
import { SlideProps } from '../transitions/Slide';
import { Theme } from '../styles/createMuiTheme';

export interface DrawerProps extends StandardProps<
  ModalProps,
  DrawerClassKey
> {
  anchor?: 'left' | 'top' | 'right' | 'bottom';
  elevation?: number;
  transitionDuration?: TransitionDuration;
  open?: boolean;
  SlideProps?: SlideProps;
  theme?: Theme;
  type?: 'permanent' | 'persistent' | 'temporary';
}

export type DrawerClassKey =
  | ModalClassKey
  | 'paper'
  | 'anchorLeft'
  | 'anchorRight'
  | 'anchorTop'
  | 'anchorBottom'
  | 'docked'
  | 'modal'
  ;

declare const Drawer: React.ComponentType<DrawerProps>;

export default Drawer;
