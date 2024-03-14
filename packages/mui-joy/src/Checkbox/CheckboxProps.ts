import * as React from 'react';
import { UseSwitchParameters } from '@mui/base/useSwitch';
import { OverridableStringUnion, OverrideProps } from '@mui/types';
import { ColorPaletteProp, SxProps, VariantProp, ApplyColorInversion } from '../styles/types';
import { SlotProps, CreateSlotsAndSlotProps } from '../utils/types';

export type CheckboxSlot = 'root' | 'checkbox' | 'action' | 'input' | 'label';

export interface CheckboxSlots {
  /**
   * The component that renders the root.
   * @default 'span'
   */
  root?: React.ElementType;
  /**
   * The component that renders the checkbox.
   * @default 'span'
   */
  checkbox?: React.ElementType;
  /**
   * The component that renders the action.
   * @default 'span'
   */
  action?: React.ElementType;
  /**
   * The component that renders the input.
   * @default 'input'
   */
  input?: React.ElementType;
  /**
   * The component that renders the label.
   * @default 'label'
   */
  label?: React.ElementType;
}

export interface CheckboxPropsVariantOverrides {}
export interface CheckboxPropsColorOverrides {}
export interface CheckboxPropsSizeOverrides {}

export type CheckboxSlotsAndSlotProps = CreateSlotsAndSlotProps<
  CheckboxSlots,
  {
    root: SlotProps<'span', {}, CheckboxOwnerState>;
    checkbox: SlotProps<'span', {}, CheckboxOwnerState>;
    action: SlotProps<'span', {}, CheckboxOwnerState>;
    input: SlotProps<'input', {}, CheckboxOwnerState>;
    label: SlotProps<'label', {}, CheckboxOwnerState>;
  }
>;

export interface CheckboxTypeMap<P = {}, D extends React.ElementType = 'span'> {
  props: P &
    UseSwitchParameters &
    CheckboxSlotsAndSlotProps & {
      /**
       * The icon to display when the component is checked.
       * @default <CheckIcon />
       */
      checkedIcon?: React.ReactNode;
      /**
       * Class name applied to the root element.
       */
      className?: string;
      /**
       * The color of the component. It supports those theme colors that make sense for this component.
       * @default 'neutral'
       */
      color?: OverridableStringUnion<ColorPaletteProp, CheckboxPropsColorOverrides>;
      /**
       * If `true`, the checked icon is removed and the selected variant is applied on the `action` element instead.
       * @default false
       */
      disableIcon?: boolean;
      /**
       * If `true`, the component appears indeterminate.
       * This does not set the native input element to indeterminate due
       * to inconsistent behavior across browsers.
       * However, we set a `data-indeterminate` attribute on the `input`.
       * @default false
       */
      indeterminate?: boolean;
      /**
       * The icon to display when the component is indeterminate.
       * @default <IndeterminateIcon />
       */
      indeterminateIcon?: React.ReactNode;
      /**
       * The label element next to the checkbox.
       */
      label?: React.ReactNode;
      /**
       * The `name` attribute of the input.
       */
      name?: string;
      /**
       * If `true`, the root element's position is set to initial which allows the action area to fill the nearest positioned parent.
       * This prop is useful for composing Checkbox with ListItem component.
       * @default false
       */
      overlay?: boolean;
      /**
       * The size of the component.
       * @default 'md'
       */
      size?: OverridableStringUnion<'sm' | 'md' | 'lg', CheckboxPropsSizeOverrides>;
      /**
       * The system prop that allows defining system overrides as well as additional CSS styles.
       */
      sx?: SxProps;
      /**
       * The [global variant](https://mui.com/joy-ui/main-features/global-variants/) to use.
       * @default 'solid'
       */
      variant?: OverridableStringUnion<VariantProp, CheckboxPropsVariantOverrides>;
      /**
       * The icon when `checked` is false.
       */
      uncheckedIcon?: React.ReactNode;
      /**
       * The value of the component. The DOM API casts this to a string.
       * The browser uses "on" as the default value.
       */
      value?: React.AllHTMLAttributes<HTMLInputElement>['value'];
    };
  defaultComponent: D;
}

export type CheckboxProps<
  D extends React.ElementType = CheckboxTypeMap['defaultComponent'],
  P = {
    component?: React.ElementType;
  },
> = OverrideProps<CheckboxTypeMap<P, D>, D>;

export interface CheckboxOwnerState extends ApplyColorInversion<CheckboxProps> {
  /**
   * If `true`, the checkbox's focus is visible.
   */
  focusVisible?: boolean;
}
