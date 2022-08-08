import { OverridableStringUnion, OverrideProps } from '@mui/types';
import * as React from 'react';
import { ColorPaletteProp, SxProps, VariantProp } from '../styles/types';

export type AlertSlot = 'root' | 'icon' | 'action' | 'message';

export interface AlertPropsVariantOverrides {}
export interface AlertPropsColorOverrides {}

export interface AlertTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {
    /**
     * The action to display. It renders after the message, at the end of the alert.
     */
    action?: React.ReactNode;
    /**
     * Override the default label for the *close popup* icon button.
     *
     * For localization purposes, you can use the provided [translations](/material-ui/guides/localization/).
     * @default 'Close'
     */
    closeText?: string;
    /**
     * The color of the component. It supports those theme colors that make sense for this component.
     * @default 'primary'
     */
    color?: OverridableStringUnion<ColorPaletteProp, AlertPropsColorOverrides>;
    /**
     * Override the icon displayed before the children.
     * Set to `false` to remove the `icon`.
     */
    icon?: React.ReactNode;
    /**
     * Callback fired when the component requests to be closed.
     * When provided and no `action` prop is set, a close icon button is displayed that triggers the callback when clicked.
     * @param {React.SyntheticEvent} event The event source of the callback.
     */
    onClose?: (event: React.SyntheticEvent) => void;
    /**
     * The ARIA role attribute of the element.
     * @default 'alert'
     */
    role?: string;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps;
    /**
     * The variant to use.
     * @default 'solid'
     */
    variant?: OverridableStringUnion<VariantProp, AlertPropsVariantOverrides>;
  };
  defaultComponent: D;
}

export type AlertProps<
  D extends React.ElementType = AlertTypeMap['defaultComponent'],
  P = { component?: React.ElementType },
> = OverrideProps<AlertTypeMap<P, D>, D>;
