import * as React from 'react';
import { StandardProps } from '..';
import { SnackbarContentProps } from '.';
import { TransitionHandlerProps, TransitionProps } from '../transitions/transition';

export type SnackBarOrigin = {
  horizontal?: 'left' | 'center' | 'right' | number;
  vertical?: 'top' | 'center' | 'bottom' | number;
};

export interface SnackbarProps
  extends StandardProps<
      React.HTMLAttributes<HTMLDivElement> & Partial<TransitionHandlerProps>,
      SnackbarClassKey
    > {
  action?: React.ReactElement<any> | React.ReactElement<any>[];
  anchorOrigin?: SnackBarOrigin;
  autoHideDuration?: number;
  disableWindowBlurListener?: boolean;
  message?: React.ReactElement<any>;
  onClose?: (event: React.SyntheticEvent<any>, reason: string) => void;
  onMouseEnter?: React.MouseEventHandler<any>;
  onMouseLeave?: React.MouseEventHandler<any>;
  open: boolean;
  resumeHideDuration?: number;
  SnackbarContentProps?: Partial<SnackbarContentProps>;
  transition?: React.ReactType;
  transitionDuration?: TransitionProps['timeout'];
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
