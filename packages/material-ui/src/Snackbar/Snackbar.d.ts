import * as React from 'react';
import { StandardProps } from '..';
import { SnackbarContentProps } from '../SnackbarContent';
import { TransitionHandlerProps, TransitionProps } from '../transitions/transition';
import { ClickAwayListenerProps } from '../ClickAwayListener';

export interface SnackbarOrigin {
  horizontal: 'left' | 'center' | 'right';
  vertical: 'top' | 'center' | 'bottom';
}

export interface SnackbarProps
  extends StandardProps<
      React.HTMLAttributes<HTMLDivElement> & Partial<TransitionHandlerProps>,
      SnackbarClassKey
    > {
  action?: SnackbarContentProps['action'];
  anchorOrigin?: SnackbarOrigin;
  autoHideDuration?: number;
  ClickAwayListenerProps?: Partial<ClickAwayListenerProps>;
  ContentProps?: Partial<SnackbarContentProps>;
  disableWindowBlurListener?: boolean;
  message?: SnackbarContentProps['message'];
  onClose?: (event: React.SyntheticEvent<any>, reason: string) => void;
  onMouseEnter?: React.MouseEventHandler<any>;
  onMouseLeave?: React.MouseEventHandler<any>;
  open: boolean;
  resumeHideDuration?: number;
  TransitionComponent?: React.ReactType;
  transitionDuration?: TransitionProps['timeout'];
  TransitionProps?: TransitionProps;
}

export type SnackbarClassKey =
  | 'root'
  | 'anchorOriginTopCenter'
  | 'anchorOriginBottomCenter'
  | 'anchorOriginTopRight'
  | 'anchorOriginBottomRight'
  | 'anchorOriginTopLeft'
  | 'anchorOriginBottomLeft';

declare const Snackbar: React.ComponentType<SnackbarProps>;

export default Snackbar;
