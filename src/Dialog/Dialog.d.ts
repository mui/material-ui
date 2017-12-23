import * as React from 'react';
import { StandardProps } from '..';
import { ModalProps, ModalClassKey } from '../Modal';
import { TransitionDuration } from '../internal/transition';

export interface DialogProps extends StandardProps<ModalProps, DialogClassKey, 'children'> {
  children?: React.ReactNode;
  fullScreen?: boolean;
  fullWidth?: boolean;
  maxWidth?: 'xs' | 'sm' | 'md';
  transition?: React.ReactType;
  transitionDuration?: TransitionDuration;
}

export type DialogClassKey =
  | ModalClassKey
  | 'root'
  | 'paper'
  | 'paperWidthXs'
  | 'paperWidthSm'
  | 'paperWidthMd'
  | 'fullWidth'
  | 'fullScreen';

declare const Dialog: React.ComponentType<DialogProps>;

export default Dialog;
