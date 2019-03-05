import * as React from 'react';
import { StandardProps } from '..';
import { PaperProps } from '../Paper';
import { ModalProps } from '../Modal';
import { TransitionHandlerProps, TransitionProps } from '../transitions/transition';

export interface DialogProps
  extends StandardProps<ModalProps & Partial<TransitionHandlerProps>, DialogClassKey, 'children'> {
  children?: React.ReactNode;
  fullScreen?: boolean;
  fullWidth?: boolean;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  PaperComponent?: React.ComponentType<PaperProps>;
  PaperProps?: Partial<PaperProps>;
  TransitionComponent?: React.ComponentType<TransitionProps>;
  transitionDuration?: TransitionProps['timeout'];
  TransitionProps?: TransitionProps;
}

export type DialogClassKey =
  | 'root'
  | 'scrollPaper'
  | 'container'
  | 'paper'
  | 'paperScrollPaper'
  | 'paperWidthFalse'
  | 'paperWidthXs'
  | 'paperWidthSm'
  | 'paperWidthMd'
  | 'paperWidthLg'
  | 'paperWidthXl'
  | 'paperFullWidth'
  | 'paperFullScreen';

declare const Dialog: React.ComponentType<DialogProps>;

export default Dialog;
