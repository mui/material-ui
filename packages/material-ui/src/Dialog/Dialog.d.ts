import * as React from 'react';
import { StandardProps } from '..';
import { ModalProps } from '../Modal';
import { TransitionHandlerProps, TransitionProps } from '../transitions/transition';

export interface DialogProps<C = {}>
  extends StandardProps<ModalProps & Partial<TransitionHandlerProps>, DialogClassKey, 'children'> {
  children?: React.ReactNode;
  fullScreen?: boolean;
  fullWidth?: boolean;
  maxWidth?: 'xs' | 'sm' | 'md' | false;
  PaperProps?: Partial<C>;
  scroll?: 'body' | 'paper';
  TransitionComponent?: React.ReactType;
  transitionDuration?: TransitionProps['timeout'];
  TransitionProps?: TransitionProps;
}

export type DialogClassKey =
  | 'root'
  | 'scrollPaper'
  | 'scrollBody'
  | 'paper'
  | 'paperScrollPaper'
  | 'paperScrollBody'
  | 'paperWidthXs'
  | 'paperWidthSm'
  | 'paperWidthMd'
  | 'paperFullWidth'
  | 'paperFullScreen';

declare class Dialog<C> extends React.Component<C & DialogProps<C>> { }

export default Dialog;
