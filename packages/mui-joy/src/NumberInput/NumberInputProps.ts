import * as React from 'react';
import { OverridableStringUnion, OverrideProps } from '@mui/types';
import { ApplyColorInversion, ColorPaletteProp, SxProps, VariantProp } from '../styles/types';
import { CreateSlotsAndSlotProps, SlotProps } from '../utils/types';

export type NumberInputSlot =
  | 'root'
  | 'input'
  | 'startDecorator'
  | 'endDecorator'
  | 'increment'
  | 'decrement';

export interface NumberInputSlots {
  /**
   * The component that renders the root.
   * @default 'div'
   */
  root?: React.ElementType;
  /**
   * The component that renders the input.
   * @default 'input'
   */
  input?: React.ElementType;
  /**
   * The component that renders the start decorator.
   * @default 'div'
   */
  startDecorator?: React.ElementType;
  /**
   * The component that renders the end decorator.
   * @default 'div'
   */
  endDecorator?: React.ElementType;
  /**
   * The component that renders the increment button.
   * @default 'button'
   */
  incrementButton?: React.ElementType;
  /**
   * The component that renders the decrement button.
   * @default 'button'
   */
  decrementButton?: React.ElementType;
}

export interface NumberInputPropsVariantOverrides {}
export interface NumberInputPropsColorOverrides {}
export interface NumberInputPropsSizeOverrides {}

export type NumberInputSlotsAndSlotProps = CreateSlotsAndSlotProps<
  NumberInputSlots,
  {
    root: SlotProps<'div', {}, NumberInputOwnerState>;
    input: SlotProps<'input', {}, NumberInputOwnerState>;
    startDecorator: SlotProps<'span', {}, NumberInputOwnerState>;
    endDecorator: SlotProps<'span', {}, NumberInputOwnerState>;
    incrementButton: SlotProps<'button', {}, NumberInputOwnerState>;
    decrementButton: SlotProps<'button', {}, NumberInputOwnerState>;
  }
>;

export interface NumberInputTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P &
    Pick<
      React.InputHTMLAttributes<HTMLInputElement>,
      | 'autoComplete'
      | 'autoFocus'
      | 'onClick'
      | 'onChange'
      | 'onKeyDown'
      | 'onKeyUp'
      | 'onFocus'
      | 'onBlur'
      | 'defaultValue'
      | 'value'
      | 'type'
      | 'placeholder'
      | 'readOnly'
      | 'required'
      | 'name'
      | 'id'
      | 'disabled'
    > & {
      /**
       * Class name applied to the root element.
       */
      className?: string;
      /**
       * The component used to render decrement button.
       */
      decrementButton?: React.ReactNode;
      /**
       * The component used to render increment button.
       */
      incrementButton?: React.ReactNode;
      /**
       * The color of the component. It supports those theme colors that make sense for this component.
       * @default 'neutral'
       */
      color?: OverridableStringUnion<ColorPaletteProp, NumberInputPropsColorOverrides>;
      /**
       * Trailing adornment for this input.
       */
      endDecorator?: React.ReactNode;
      /**
       * If `true`, the `input` will indicate an error.
       * The prop defaults to the value (`false`) inherited from the parent FormControl component.
       * @default false
       */
      error?: boolean;
      /**
       * If `true`, the input will take up the full width of its container.
       * @default false
       */
      fullWidth?: boolean;
      /**
       * Leading adornment for this input.
       */
      startDecorator?: React.ReactNode;
      /**
       * The size of the component.
       * @default 'md'
       */
      size?: OverridableStringUnion<'sm' | 'md' | 'lg', NumberInputPropsSizeOverrides>;
      /**
       * The system prop that allows defining system overrides as well as additional CSS styles.
       */
      sx?: SxProps;
      /**
       * The [global variant](https://mui.com/joy-ui/main-features/global-variants/) to use.
       * @default 'outlined'
       */
      variant?: OverridableStringUnion<VariantProp, NumberInputPropsVariantOverrides>;
    } & NumberInputSlotsAndSlotProps;
  defaultComponent: D;
}

export type NumberInputProps<
  D extends React.ElementType = NumberInputTypeMap['defaultComponent'],
  P = {
    component?: React.ElementType;
  },
> = OverrideProps<NumberInputTypeMap<P, D>, D>;

export default NumberInputProps;

export interface NumberInputOwnerState extends ApplyColorInversion<NumberInputProps> {
  /**
   * If `true`, the input is focused.
   */
  focused: boolean;
  /**
   * @internal
   */
  instanceColor?: OverridableStringUnion<ColorPaletteProp, NumberInputPropsColorOverrides>;
}
