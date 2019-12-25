import * as React from 'react';
import { StandardProps } from '@material-ui/core';
import { PaperProps } from '@material-ui/core/Paper';

export type Color = 'success' | 'info' | 'warning' | 'error';

export interface AlertProps extends StandardProps<PaperProps, AlertClassKey, 'variant'> {
  /**
   * The action to display.
   */
  action?: React.ReactNode;
  /**
   * Main color for the Alert, picked from theme palette.
   */
  color?: Color;
  /**
   * The icon element placed before the children.
   */
  icon?: React.ReactNode | false;
  /**
   * The role attribute of the element.
   */
  role?: string;
  /**
   * The component maps the color prop to a range of different icons.
   * For instance, success to `<SuccessOutlined>`.
   * If you wish to change that mapping, you can provide your own.
   * Alternatively, you can use the `icon` prop.
   */
  iconMapping?: Partial<Record<Color, React.ReactNode>>;
  /**
   * The variant of the Alert.
   */
  variant?: 'text' | 'filled' | 'outlined';
}

export type AlertClassKey =
  | 'root'
  | 'textSuccess'
  | 'textInfo'
  | 'textWarning'
  | 'textError'
  | 'outlinedSuccess'
  | 'outlinedInfo'
  | 'outlinedWarning'
  | 'outlinedError'
  | 'filledSuccess'
  | 'filledInfo'
  | 'filledWarning'
  | 'filledError'
  | 'icon'
  | 'message'
  | 'action';

export default function Alert(props: AlertProps): JSX.Element;
