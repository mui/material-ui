import * as React from 'react';
import { StandardProps } from '..';
import { TransitionDuration, TransitionHandlers } from '../internal/transition';

export type SnackBarOrigin = {
  horizontal?: 'left' | 'center' | 'right' | number;
  vertical?: 'top' | 'center' | 'bottom' | number;
};

export interface SnackbarProps extends StandardProps<
  React.HTMLAttributes<HTMLDivElement> & Partial<TransitionHandlers>,
  SnackbarClassKey
> {
  action?: React.ReactElement<any> | React.ReactElement<any>[];
  anchorOrigin?: SnackBarOrigin;
  autoHideDuration?: number;
  message?: React.ReactElement<any>;
  onClose?: (event: React.SyntheticEvent<any>, reason: string) => void;
  onMouseEnter?: React.MouseEventHandler<any>;
  onMouseLeave?: React.MouseEventHandler<any>;
  open: boolean;
  resumeHideDuration?: number;
  SnackbarContentProps?: Object;
  transition?: React.ReactType;
  transitionDuration?: TransitionDuration;
}

export type SnackbarClassKey =
  | 'root'
  | 'anchorTopCenter'
  | 'anchorBottomCenter'
  | 'anchorTopRight'
  | 'anchorBottomRight'
  | 'anchorTopLeft'
  | 'anchorBottomLeft'
  ;

declare const Snackbar: React.ComponentType<SnackbarProps>;

export default Snackbar;
