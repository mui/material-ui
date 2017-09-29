import * as React from 'react';
import { StyledComponent } from '..';
import { TransitionDuration, TransitionHandlers } from '../internal/Transition';
export type Origin = {
  horizontal?: 'left' | 'center' | 'right' | number;
  vertical?: 'top' | 'center' | 'bottom' | number;
};

export type SnackbarProps = {
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
  transition?: React.ReactNode;
} & Partial<TransitionHandlers> &
  React.HTMLAttributes<HTMLDivElement>;

export type SnackbarClassKey =
  | 'root'
  | 'anchorTopCenter'
  | 'anchorBottomCenter'
  | 'anchorTopRight'
  | 'anchorBottomRight'
  | 'anchorTopLeft'
  | 'anchorBottomLeft'
  ;

declare const Snackbar: StyledComponent<SnackbarProps, SnackbarClassKey>;

export default Snackbar;
