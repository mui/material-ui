import * as React from 'react';
import { UseSwitchParameters } from '@mui/base/useSwitch';
import { OverridableStringUnion, OverrideProps } from '@mui/types';
import { ColorPaletteProp, SxProps, VariantProp, ApplyColorInversion } from '../styles/types';
import { CreateSlotsAndSlotProps, SlotProps } from '../utils/types';

export type RadioSlot = 'root' | 'radio' | 'icon' | 'action' | 'input' | 'label';

export interface RadioSlots {
  /**
   * The component that renders the root.
   * @default 'span'
   */
  root?: React.ElementType;
  /**
   * The component that renders the radio.
   * @default 'span'
   */
  radio?: React.ElementType;
  /**
   * The component that renders the icon.
   * @default 'span'
   */
  icon?: React.ElementType;
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

export interface RadioPropsVariantOverrides {}

export interface RadioPropsColorOverrides {}

export interface RadioPropsSizeOverrides {}

export type RadioSlotsAndSlotProps = CreateSlotsAndSlotProps<
  RadioSlots,
  {
    root: SlotProps<'span', {}, RadioOwnerState>;
    radio: SlotProps<'span', {}, RadioOwnerState>;
    icon: SlotProps<'span', {}, RadioOwnerState>;
    action: SlotProps<'span', {}, RadioOwnerState>;
    input: SlotProps<'input', {}, RadioOwnerState>;
    label: SlotProps<'label', {}, RadioOwnerState>;
  }
>;

export interface RadioTypeMap<P = {}, D extends React.ElementType = 'span'> {
  props: P &
    UseSwitchParameters & {
      /**
       * The icon to display when the component is checked.
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
      color?: OverridableStringUnion<ColorPaletteProp, RadioPropsColorOverrides>;
      /**
       * If `true`, the checked icon is removed and the selected variant is applied on the `action` element instead.
       * @default false
       */
      disableIcon?: boolean;
      /**
       * The label element at the end the radio.
       */
      label?: React.ReactNode;
      /**
       * The `name` attribute of the input.
       */
      name?: string;
      /**
       * If `true`, the root element's position is set to initial which allows the action area to fill the nearest positioned parent.
       * This prop is useful for composing Radio with ListItem component.
       * @default false
       */
      overlay?: boolean;
      /**
       * The size of the component.
       * @default 'md'
       */
      size?: OverridableStringUnion<'sm' | 'md' | 'lg', RadioPropsSizeOverrides>;
      /**
       * The system prop that allows defining system overrides as well as additional CSS styles.
       */
      sx?: SxProps;
      /**
       * The icon to display when the component is not checked.
       */
      uncheckedIcon?: React.ReactNode;
      /**
       * The [global variant](https://mui.com/joy-ui/main-features/global-variants/) to use.
       * @default 'outlined'
       */
      variant?: OverridableStringUnion<VariantProp, RadioPropsVariantOverrides>;
      /**
       * The value of the component. The DOM API casts this to a string.
       */
      value?: unknown;
    } & RadioSlotsAndSlotProps;
  defaultComponent: D;
}

export type RadioProps<
  D extends React.ElementType = RadioTypeMap['defaultComponent'],
  P = {
    component?: React.ElementType;
  },
> = OverrideProps<RadioTypeMap<P, D>, D>;

export interface RadioOwnerState extends ApplyColorInversion<RadioProps> {
  /**
   * If `true`, the element's focus is visible.
   */
  focusVisible?: boolean;
  /**
   * @internal
   * The value from the RadioGroup component.
   */
  orientation?: 'horizontal' | 'vertical';
  /**
   * @internal
   * The internal prop for controlling CSS margin of the element.
   */
  'data-first-child'?: string;
  /**
   * @internal
   * The internal prop for controlling CSS margin of the element.
   */
  'data-parent'?: string;
}
