import * as React from 'react';
import { StandardProps } from '..';
import { SnackbarContentProps } from '../SnackbarContent';
import { TransitionHandlerProps, TransitionProps } from '../transitions/transition';

export type SnackBarOrigin = {
  horizontal?: 'left' | 'center' | 'right' | number;
  vertical?: 'top' | 'center' | 'bottom' | number;
};

export interface SnackbarProps<C = {}>
  extends StandardProps<
      React.HTMLAttributes<HTMLDivElement> & Partial<TransitionHandlerProps>,
      SnackbarClassKey
    > {
  action?: React.ReactElement<any> | React.ReactElement<any>[];
  anchorOrigin?: SnackBarOrigin;
  autoHideDuration?: number;
  ContentProps?: Partial<C & SnackbarContentProps<C>>;
  disableWindowBlurListener?: boolean;
  message?: React.ReactElement<any>;
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

declare class Snackbar<C> extends React.Component<SnackbarProps<C>> {}

export default Snackbar;
