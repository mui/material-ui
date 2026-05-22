import type * as React from 'react';
import { type SxProps } from '@mui/system';
import { type OverridableStringUnion } from '@mui/types';
import { type Theme } from '../styles';
import { type InternalStandardProps as StandardProps } from '../internal';
import { type CreateSlotsAndSlotProps, type SlotProps } from '../utils/types';
import { type SwitchBaseProps } from '../internal/SwitchBase';
import { type RadioClasses } from './radioClasses';

export interface RadioPropsSizeOverrides {}

export interface RadioPropsColorOverrides {}

export interface RadioRootSlotPropsOverrides {}

export interface RadioInputSlotPropsOverrides {}

export interface RadioSlots {
  /**
   * The component that renders the root slot.
   * @default SwitchBase
   */
  root: React.ElementType;
  /**
   * The component that renders the input slot.
   * @default SwitchBase's input
   */
  input: React.ElementType;
}

export type RadioSlotsAndSlotProps = CreateSlotsAndSlotProps<
  RadioSlots,
  {
    /**
     * Props forwarded to the root slot.
     * By default, the available props are based on the span element.
     */
    root: SlotProps<
      React.ElementType<SwitchBaseProps>,
      RadioRootSlotPropsOverrides,
      RadioOwnerState
    >;
    /**
     * Props forwarded to the input slot.
     * By default, the available props are based on the input element.
     */
    input: SlotProps<'input', RadioInputSlotPropsOverrides, RadioOwnerState>;
  }
>;

export interface RadioProps
  extends
    StandardProps<
      SwitchBaseProps,
      'checkedIcon' | 'color' | 'icon' | 'type' | 'slots' | 'slotProps'
    >,
    RadioSlotsAndSlotProps {
  /**
   * The icon to display when the component is checked.
   * @default <RadioButtonIcon checked />
   */
  checkedIcon?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<RadioClasses> | undefined;
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'primary'
   */
  color?:
    | OverridableStringUnion<
        'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'default',
        RadioPropsColorOverrides
      >
    | undefined;
  /**
   * If `true`, the component is disabled.
   */
  disabled?: boolean | undefined;
  /**
   * The icon to display when the component is unchecked.
   * @default <RadioButtonIcon />
   */
  icon?: React.ReactNode;
  /**
   * The size of the component.
   * `small` is equivalent to the dense radio styling.
   * @default 'medium'
   */
  size?: OverridableStringUnion<'small' | 'medium', RadioPropsSizeOverrides> | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
}

export interface RadioOwnerState extends Omit<RadioProps, 'slots' | 'slotProps'> {}

/**
 *
 * Demos:
 *
 * - [Radio Group](https://mui.com/material-ui/react-radio-button/)
 *
 * API:
 *
 * - [Radio API](https://mui.com/material-ui/api/radio/)
 * - inherits [ButtonBase API](https://mui.com/material-ui/api/button-base/)
 */
export default function Radio(props: RadioProps): React.JSX.Element;
