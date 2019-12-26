import * as React from 'react';
import { StandardProps } from '@material-ui/core';
import { PaperProps } from '@material-ui/core/Paper';

export type Color = 'success' | 'info' | 'warning' | 'error';

export interface AlertProps extends StandardProps<PaperProps, AlertClassKey, 'variant'> {
  /**
   * The action to display. It renders after the message, at the end of the alert.
   */
  action?: React.ReactNode;
  /**
   * Override the default text for the *close popup* icon button.
   *
   * For localization purposes, you can use the provided [translations](/guides/localization/).
   */
  closeText?: string;
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
   * Callback fired when the component requests to be closed.
   * When provided and no action prop is set, a close icon is displayed.
   *
   * @param {object} event The event source of the callback.
   */
  onClose?: (event: React.SyntheticEvent) => void;
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
