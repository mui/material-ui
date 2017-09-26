import * as React from 'react';
import { StyledComponent } from '..';
import { ModalProps } from '../internal/Modal';

export type DialogProps = {
  fullScreen?: boolean;
  ignoreBackdropClick?: boolean;
  ignoreEscapeKeyUp?: boolean;
  enterTransitionDuration?: number | string;
  leaveTransitionDuration?: number | string;
  maxWidth?: 'xs' | 'sm' | 'md';
  fullWidth?: boolean;
  onBackdropClick?: Function;
  onEscapeKeyUp?: Function;
  onRequestClose?: React.EventHandler<any>;
  open?: boolean;
  transition?: Function | React.ReactElement<any>;
} & ModalProps;

export type DialogClassKey =
  | 'root'
  | 'paper'
  | 'paperWidthXs'
  | 'paperWidthSm'
  | 'paperWidthMd'
  | 'fullWidth'
  | 'fullScreen'
  ;

declare const Dialog: StyledComponent<DialogProps, DialogClassKey>;

export default Dialog;
