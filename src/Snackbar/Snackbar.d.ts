import * as React from 'react';
import { StyledComponent } from '..';
import { TransitionHandlers } from '../internal/Transition';
export type Origin = {
  horizontal?: 'left' | 'center' | 'right' | number;
  vertical?: 'top' | 'center' | 'bottom' | number;
};

export type SnackbarProps = {
  action?: React.ReactElement<any> | React.ReactElement<any>[];
  anchorOrigin?: Origin;
  autoHideDuration?: number;
  enterTransitionDuration?: number;
  key?: number;
  leaveTransitionDuration?: number;
  message?: React.ReactElement<any>;
  onMouseEnter?: React.MouseEventHandler<any>;
  onMouseLeave?: React.MouseEventHandler<any>;
  onRequestClose?: (event: React.SyntheticEvent<any>, reason: string) => void;
  open: boolean;
  SnackbarContentProps?: Object;
  transition?: React.ReactNode;
} & Partial<TransitionHandlers> &
  React.HTMLAttributes<HTMLDivElement>;

export default class Snackbar extends StyledComponent<SnackbarProps> {}
