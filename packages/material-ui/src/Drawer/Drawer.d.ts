import * as React from 'react';
import { StandardProps } from '..';
import { ModalProps } from '../Modal';
import { SlideProps } from '../Slide';
import { PaperProps } from '../Paper';
import { Theme } from '../styles/createMuiTheme';
import { TransitionHandlerProps, TransitionProps } from '../transitions/transition';

export interface DrawerProps<C = {}>
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
  PaperProps?: Partial<PaperProps<C>>;
  SlideProps?: Partial<SlideProps>;
  theme?: Theme;
  transitionDuration?: TransitionProps['timeout'];
  variant?: 'permanent' | 'persistent' | 'temporary';
}

export type DrawerClassKey =
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

declare class Drawer<C> extends React.Component<DrawerProps<C>> {}

export default Drawer;
