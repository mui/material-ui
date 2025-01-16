import * as React from 'react';
import { Breakpoint } from '@mui/system';
import { OverridableStringUnion, OverrideProps } from '@mui/types';
import { ColorPaletteProp, VariantProp, SxProps, ApplyColorInversion } from '../styles/types';
import { SlotProps, CreateSlotsAndSlotProps } from '../utils/types';

type ResponsiveStyleValue<T> = T | Array<T | null> | { [key in Breakpoint]?: T | null };

export type SupportedValue = Array<string> | string | null;

export type ToggleButtonGroupSlot = 'root';

export interface ToggleButtonGroupSlots {
  /**
   * The component that renders the root.
   * @default 'div'
   */
  root?: React.ElementType;
}

export type ToggleButtonGroupSlotsAndSlotProps = CreateSlotsAndSlotProps<
  ToggleButtonGroupSlots,
  {
    root: SlotProps<'div', {}, ToggleButtonGroupOwnerState<any>>;
  }
>;

export interface ToggleButtonGroupPropsColorOverrides {}
export interface ToggleButtonGroupPropsVariantOverrides {}
export interface ToggleButtonGroupPropsSizeOverrides {}

export interface ToggleButtonGroupStaticProps {
  /**
   * The flex value of the button.
   * @example buttonFlex={1} will set flex: '1 1 auto' on each button (stretch the button to equally fill the available space).
   */
  buttonFlex?: number | string;
  /**
   * Used to render icon or text elements inside the ButtonGroup if `src` is not set.
   * This can be an element, or just a string.
   */
  children?: React.ReactNode;
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'neutral'
   */
  color?: OverridableStringUnion<ColorPaletteProp, ToggleButtonGroupPropsColorOverrides>;
  /**
   * If `true`, all the buttons will be disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * The component orientation.
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical';
  /**
   * The size of the component.
   * It accepts theme values between 'sm' and 'lg'.
   * @default 'md'
   */
  size?: OverridableStringUnion<'sm' | 'md' | 'lg', ToggleButtonGroupPropsSizeOverrides>;
  /**
   * Defines the space between the type `item` components.
   * It can only be used on a type `container` component.
   * @default 0
   */
  spacing?: ResponsiveStyleValue<number | string> | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps;

  /**
   * The [global variant](https://mui.com/joy-ui/main-features/global-variants/) to use.
   * @default 'outlined'
   */
  variant?: OverridableStringUnion<VariantProp, ToggleButtonGroupPropsVariantOverrides>;
}

export interface ToggleButtonGroupOwnProps<TValue extends SupportedValue>
  extends ToggleButtonGroupStaticProps {
  /**
   * The currently selected value within the group or an array of selected values.
   *
   * The value must have reference equality with the option in order to be selected.
   */
  value?: TValue;
  /**
   * Callback fired when the value changes.
   *
   * @param {React.MouseEvent<HTMLElement>} event The event source of the callback.
   * @param {any} value of the selected buttons. When `exclusive` is true
   * this is a single value; when false an array of selected values. If no value
   * is selected and `exclusive` is true the value is null; when false an empty array.
   */
  onChange?: (
    event: React.MouseEvent<HTMLElement>,
    value: TValue extends Array<infer U> ? Array<U> : TValue | null,
  ) => void;
}

export interface ToggleButtonGroupTypeMap<
  TValue extends SupportedValue,
  P = {},
  D extends React.ElementType = 'div',
> {
  props: P & ToggleButtonGroupOwnProps<TValue> & ToggleButtonGroupSlotsAndSlotProps;
  defaultComponent: D;
}

export type ToggleButtonGroupProps<
  TValue extends SupportedValue = SupportedValue,
  D extends React.ElementType = ToggleButtonGroupTypeMap<TValue>['defaultComponent'],
  P = { component?: React.ElementType },
> = OverrideProps<ToggleButtonGroupTypeMap<TValue, P, D>, D>;

export interface ToggleButtonGroupOwnerState<TValue extends SupportedValue = SupportedValue>
  extends ApplyColorInversion<ToggleButtonGroupProps<TValue>> {}
