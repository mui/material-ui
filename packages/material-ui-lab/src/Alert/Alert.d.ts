import * as React from 'react';
import { StandardProps } from '@material-ui/core';

export interface AlertProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, AlertClassKey> {
  /**
   * Element placed before the children.
   */
  closeIcon?: React.ReactNode,
  /*
   * Main color for the Alert, picked from theme palette
   */
  color?: 'primary' | 'secondary' | 'error';
  /*
   * Elevation property that is passed to underlying Paper component
   */
  elevation?: number;
  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {object} event The event source of the callback.
   */
  onClose?: (event: React.SyntheticEvent) => void,
  /**
   * Element placed before the children.
   */
  startIcon?: React.ReactNode | false,
  /**
   * The type of Alert
   */
  type?: 'success' | 'info' | 'warning' | 'error';
  /*
   * The variant of the Alert
   */
  variant?: 'text' | 'filled' | 'outline' | 'banner';
}

export type AlertClassKey = 'root';

export default function Alert(props: AlertProps): JSX.Element;
