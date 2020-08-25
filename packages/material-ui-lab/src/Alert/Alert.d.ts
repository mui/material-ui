import * as React from 'react';
import { OverridableStringUnion } from '@material-ui/types';
import { InternalStandardProps as StandardProps } from '@material-ui/core';
import { PaperProps } from '@material-ui/core/Paper';

export type Color = 'success' | 'info' | 'warning' | 'error';

export interface AlertPropsVariantOverrides {}
export type AlertVariantDefaults = Record<'standard' | 'filled' | 'outlined', true>;

export interface AlertProps extends StandardProps<PaperProps, 'variant'> {
  /**
   * The action to display. It renders after the message, at the end of the alert.
   */
  action?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: {
    /** Styles applied to the root element. */
    root?: string;
    /** Styles applied to the root element if `variant="filled"`. */
    filled?: string;
    /** Styles applied to the root element if `variant="outlined"`. */
    outlined?: string;
    /** Styles applied to the root element if `variant="standard"`. */
    standard?: string;
    /** Styles applied to the root element if `variant="standard"` and `color="success"`. */
    standardSuccess?: string;
    /** Styles applied to the root element if `variant="standard"` and `color="info"`. */
    standardInfo?: string;
    /** Styles applied to the root element if `variant="standard"` and `color="warning"`. */
    standardWarning?: string;
    /** Styles applied to the root element if `variant="standard"` and `color="error"`. */
    standardError?: string;
    /** Styles applied to the root element if `variant="outlined"` and `color="success"`. */
    outlinedSuccess?: string;
    /** Styles applied to the root element if `variant="outlined"` and `color="info"`. */
    outlinedInfo?: string;
    /** Styles applied to the root element if `variant="outlined"` and `color="warning"`. */
    outlinedWarning?: string;
    /** Styles applied to the root element if `variant="outlined"` and `color="error"`. */
    outlinedError?: string;
    /** Styles applied to the root element if `variant="filled"` and `color="success"`. */
    filledSuccess?: string;
    /** Styles applied to the root element if `variant="filled"` and `color="info"`. */
    filledInfo?: string;
    /** Styles applied to the root element if `variant="filled"` and `color="warning"`. */
    filledWarning?: string;
    /** Styles applied to the root element if `variant="filled"` and `color="error"`. */
    filledError?: string;
    /** Styles applied to the icon wrapper element. */
    icon?: string;
    /** Styles applied to the message wrapper element. */
    message?: string;
    /** Styles applied to the action wrapper element if `action` is provided. */
    action?: string;
  };
  /**
   * Override the default label for the *close popup* icon button.
   *
   * For localization purposes, you can use the provided [translations](/guides/localization/).
   */
  closeText?: string;
  /**
   * The main color for the alert. Unless provided, the value is taken from the `severity` prop.
   */
  color?: Color;
  /**
   * The severity of the alert. This defines the color and icon used.
   */
  severity?: Color;
  /**
   * Override the icon displayed before the children.
   * Unless provided, the icon is mapped to the value of the `severity` prop.
   */
  icon?: React.ReactNode | false;
  /**
   * The ARIA role attribute of the element.
   */
  role?: string;
  /**
   * The component maps the `severity` prop to a range of different icons,
   * for instance success to `<SuccessOutlined>`.
   * If you wish to change this mapping, you can provide your own.
   * Alternatively, you can use the `icon` prop to override the icon displayed.
   */
  iconMapping?: Partial<Record<Color, React.ReactNode>>;
  /**
   * Callback fired when the component requests to be closed.
   * When provided and no `action` prop is set, a close icon button is displayed that triggers the callback when clicked.
   *
   * @param {object} event The event source of the callback.
   */
  onClose?: (event: React.SyntheticEvent) => void;
  /**
   * The variant to use.
   */
  variant?: OverridableStringUnion<AlertVariantDefaults, AlertPropsVariantOverrides>;
}

export type AlertClassKey = keyof NonNullable<AlertProps['classes']>;

/**
 *
 * Demos:
 *
 * - [Alert](https://material-ui.com/components/alert/)
 *
 * API:
 *
 * - [Alert API](https://material-ui.com/api/alert/)
 * - inherits [Paper API](https://material-ui.com/api/paper/)
 */
export default function Alert(props: AlertProps): JSX.Element;
