import * as React from 'react';
import { StyledComponent, StyledComponentProps } from '..';
import { ModalProps } from '../internal/Modal';
import { SlideProps } from '../transitions/Slide';
import { Theme } from '../styles/createMuiTheme';

export interface DrawerProps extends ModalProps {
  anchor?: 'left' | 'top' | 'right' | 'bottom';
  elevation?: number;
  enterTransitionDuration?: number;
  leaveTransitionDuration?: number;
  open?: boolean;
  SlideProps?: SlideProps & StyledComponentProps<any>;
  theme?: Theme;
  type: 'permanent' | 'persistent' | 'temporary';
}

declare const Drawer: StyledComponent<DrawerProps>;

export default Drawer;
