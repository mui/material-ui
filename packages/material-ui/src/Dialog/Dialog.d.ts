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
  scroll?: 'body' | 'paper';
  TransitionComponent?: React.ComponentType<TransitionProps>;
  transitionDuration?: TransitionProps['timeout'];
  TransitionProps?: TransitionProps;
}

export type DialogClassKey =
  | 'root'
  | 'scrollPaper'
  | 'scrollBody'
  | 'container'
  | 'paper'
  | 'paperScrollPaper'
  | 'paperScrollBody'
  | 'paperWidthFalse'
  | 'paperWidthXs'
  | 'paperWidthSm'
  | 'paperWidthMd'
  | 'paperWidthLg'
  | 'paperWidthXl'
  | 'paperFullWidth'
  | 'paperFullScreen';

/**
 * Dialogs are overlaid modal paper based components with a backdrop.
 *
 * Demos:
 * - {@link https://material-ui.com/components/dialogs/ Dialogs}
 *
 * API:
 * - {@link https://material-ui.com/api/Dialog Dialog API}
 * - inherits {@link https://material-ui.com/api/modal/ Modal API}
 */
declare const Dialog: React.ComponentType<DialogProps>;

export default Dialog;
