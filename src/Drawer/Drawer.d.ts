import * as React from 'react';
import { StyledComponent } from '..';
import { ModalProps } from '../internal/Modal';
import { SlideProps } from '../transitions/Slide';
import { Theme } from '../styles/theme';

export interface DrawerProps extends ModalProps {
  anchor?: 'left' | 'top' | 'right' | 'bottom';
  docked?: boolean;
  elevation?: number;
  enterTransitionDuration?: number;
  leaveTransitionDuration?: number;
  open?: boolean;
  SlideProps?: SlideProps;
  theme?: Theme;
}

export default class Drawer extends StyledComponent<DrawerProps> {}
