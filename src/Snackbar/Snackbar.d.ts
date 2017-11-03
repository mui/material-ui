import * as React from 'react';
import { StandardProps } from '..';
import { TransitionDuration, TransitionHandlers } from '../internal/transition';

export type Origin = {
  horizontal?: 'left' | 'center' | 'right' | number;
  vertical?: 'top' | 'center' | 'bottom' | number;
};

export interface SnackbarProps extends StandardProps<
  React.HTMLAttributes<HTMLDivElement> & Partial<TransitionHandlers>,
  SnackbarClassKey
> {
  action?: React.ReactElement<any> | React.ReactElement<any>[];
  anchorOrigin?: Origin;
  autoHideDuration?: number;
  resumeHideDuration?: number;
  transitionDuration?: TransitionDuration;
  message?: React.ReactElement<any>;
  onMouseEnter?: React.MouseEventHandler<any>;
  onMouseLeave?: React.MouseEventHandler<any>;
  onRequestClose?: (event: React.SyntheticEvent<any>, reason: string) => void;
  open: boolean;
  SnackbarContentProps?: Object;
  transition?: React.ReactType;
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
