import * as React from 'react';
import { StandardProps } from '..';
import { PaperProps } from '../Paper';
import { ModalProps, ModalClassKey } from '../Modal';
import { TransitionHandlers, TransitionTimeout } from '../transitions/transition';

export interface DialogProps
  extends StandardProps<ModalProps & Partial<TransitionHandlers>, DialogClassKey, 'children'> {
  children?: React.ReactNode;
  fullScreen?: boolean;
  fullWidth?: boolean;
  maxWidth?: 'xs' | 'sm' | 'md' | false;
  PaperProps?: Partial<PaperProps>;
  transition?: React.ReactType;
  transitionDuration?: TransitionTimeout;
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
