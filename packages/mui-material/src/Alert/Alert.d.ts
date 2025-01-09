import * as React from 'react';
import { OverridableStringUnion } from '@mui/types';
import { SxProps } from '@mui/system';
import { IconButtonProps, InternalStandardProps as StandardProps, SvgIconProps, Theme } from '..';
import { PaperProps } from '../Paper';
import { AlertClasses } from './alertClasses';
import { CreateSlotsAndSlotProps, SlotProps } from '../utils/types';

export type AlertColor = 'success' | 'info' | 'warning' | 'error';

export interface AlertPropsVariantOverrides {}
export interface AlertPropsColorOverrides {}

export interface AlertRootSlotPropsOverrides {}

export interface AlertIconSlotPropsOverrides {}

export interface AlertMessageSlotPropsOverrides {}

export interface AlertActionSlotPropsOverrides {}

export interface AlertCloseButtonSlotPropsOverrides {}
export interface AlertCloseIconSlotPropsOverrides {}

export interface AlertSlots {
  /**
   * The component that renders the root slot.
   * @default Paper
   */
  root: React.ElementType;
  /**
   * The component that renders the icon slot.
   * @default div
   */
  icon: React.ElementType;
  /**
   * The component that renders the message slot.
   * @default div
   */
  message: React.ElementType;
  /**
   * The component that renders the action slot.
   * @default div
   */
  action: React.ElementType;
  /**
   * The component that renders the close button.
   * @default IconButton
   */
  closeButton: React.ElementType;
  /**
   * The component that renders the close icon.
   * @default svg
   */
  closeIcon: React.ElementType;
}

export type AlertSlotsAndSlotProps = CreateSlotsAndSlotProps<
  AlertSlots,
  {
    /**
     * Props forwarded to the root slot.
     * By default, the avaible props are based on the [Paper](https://mui.com/material-ui/api/paper/#props) component.
     */
    root: SlotProps<React.ElementType<PaperProps>, AlertRootSlotPropsOverrides, AlertOwnerState>;
    /**
     * Props forwarded to the icon slot.
     * By default, the avaible props are based on a div element.
     */
    icon: SlotProps<
      React.ElementType<React.DetailsHTMLAttributes<HTMLDivElement>>,
      AlertIconSlotPropsOverrides,
      AlertOwnerState
    >;
    /**
     * Props forwarded to the message slot.
     * By default, the avaible props are based on a div element.
     */
    message: SlotProps<
      React.ElementType<React.DetailsHTMLAttributes<HTMLDivElement>>,
      AlertMessageSlotPropsOverrides,
      AlertOwnerState
    >;
    /**
     * Props forwarded to the action slot.
     * By default, the avaible props are based on a div element.
     */
    action: SlotProps<
      React.ElementType<React.DetailsHTMLAttributes<HTMLDivElement>>,
      AlertActionSlotPropsOverrides,
      AlertOwnerState
    >;
    /**
     * Props forwarded to the closeButton slot.
     * By default, the avaible props are based on the [IconButton](https://mui.com/material-ui/api/icon-button/#props) component.
     */
    closeButton: SlotProps<
      React.ElementType<IconButtonProps>,
      AlertCloseButtonSlotPropsOverrides,
      AlertOwnerState
    >;
    /**
     * Props forwarded to the closeIcon slot.
     * By default, the avaible props are based on the [SvgIcon](https://mui.com/material-ui/api/svg-icon/#props) component.
     */
    closeIcon: SlotProps<
      React.ElementType<SvgIconProps>,
      AlertCloseIconSlotPropsOverrides,
      AlertOwnerState
    >;
  }
>;

export interface AlertProps extends StandardProps<PaperProps, 'variant'>, AlertSlotsAndSlotProps {
  /**
   * The action to display. It renders after the message, at the end of the alert.
   */
  action?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<AlertClasses>;
  /**
   * Override the default label for the *close popup* icon button.
   *
   * For localization purposes, you can use the provided [translations](https://mui.com/material-ui/guides/localization/).
   * @default 'Close'
   */
  closeText?: string;
  /**
   * The color of the component. Unless provided, the value is taken from the `severity` prop.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   */
  color?: OverridableStringUnion<AlertColor, AlertPropsColorOverrides>;
  /**
   * The components used for each slot inside.
   *
   * @deprecated use the `slots` prop instead. This prop will be removed in v7. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   *
   * @default {}
   */
  components?: {
    CloseButton?: React.ElementType;
    CloseIcon?: React.ElementType;
  };
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * @deprecated use the `slotProps` prop instead. This prop will be removed in v7. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   *
   * @default {}
   */
  componentsProps?: {
    closeButton?: IconButtonProps;
    closeIcon?: SvgIconProps;
  };
  /**
   * The severity of the alert. This defines the color and icon used.
   * @default 'success'
   */
  severity?: OverridableStringUnion<AlertColor, AlertPropsColorOverrides>;
  /**
   * Override the icon displayed before the children.
   * Unless provided, the icon is mapped to the value of the `severity` prop.
   * Set to `false` to remove the `icon`.
   */
  icon?: React.ReactNode;
  /**
   * The ARIA role attribute of the element.
   * @default 'alert'
   */
  role?: string;
  /**
   * The component maps the `severity` prop to a range of different icons,
   * for instance success to `<SuccessOutlined>`.
   * If you wish to change this mapping, you can provide your own.
   * Alternatively, you can use the `icon` prop to override the icon displayed.
   */
  iconMapping?: Partial<
    Record<OverridableStringUnion<AlertColor, AlertPropsColorOverrides>, React.ReactNode>
  >;
  /**
   * Callback fired when the component requests to be closed.
   * When provided and no `action` prop is set, a close icon button is displayed that triggers the callback when clicked.
   * @param {React.SyntheticEvent} event The event source of the callback.
   */
  onClose?: (event: React.SyntheticEvent) => void;
  /**
   * The variant to use.
   * @default 'standard'
   */
  variant?: OverridableStringUnion<'standard' | 'filled' | 'outlined', AlertPropsVariantOverrides>;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
}

export interface AlertOwnerState extends AlertProps {}

/**
 *
 * Demos:
 *
 * - [Alert](https://mui.com/material-ui/react-alert/)
 *
 * API:
 *
 * - [Alert API](https://mui.com/material-ui/api/alert/)
 * - inherits [Paper API](https://mui.com/material-ui/api/paper/)
 */
export default function Alert(props: AlertProps): React.JSX.Element;
