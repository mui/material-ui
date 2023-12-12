import * as React from 'react';
import { OverridableStringUnion, OverrideProps } from '@mui/types';
import { ApplyColorInversion, ColorPaletteProp, SxProps, VariantProp } from '../styles/types';
import { CreateSlotsAndSlotProps, SlotProps } from '../utils/types';

export type TextareaSlot = 'root' | 'textarea' | 'startDecorator' | 'endDecorator';

export interface TextareaSlots {
  /**
   * The component that renders the root.
   * @default 'div'
   */
  root?: React.ElementType;
  /**
   * The component that renders the textarea.
   * @default 'textarea'
   */
  textarea?: React.ElementType;
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
}

export interface TextareaPropsVariantOverrides {}
export interface TextareaPropsColorOverrides {}
export interface TextareaPropsSizeOverrides {}

export type TextareaSlotsAndSlotProps = CreateSlotsAndSlotProps<
  TextareaSlots,
  {
    root: SlotProps<'div', {}, TextareaOwnerState>;
    textarea: SlotProps<'textarea', {}, TextareaOwnerState>;
    startDecorator: SlotProps<'div', {}, TextareaOwnerState>;
    endDecorator: SlotProps<'div', {}, TextareaOwnerState>;
  }
>;

export interface TextareaTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P &
    TextareaSlotsAndSlotProps &
    Pick<
      React.TextareaHTMLAttributes<HTMLTextAreaElement>,
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
      | 'placeholder'
      | 'readOnly'
      | 'required'
      | 'name'
      | 'id'
      | 'disabled'
    > & {
      /**
       * The color of the component. It supports those theme colors that make sense for this component.
       * @default 'neutral'
       */
      color?: OverridableStringUnion<ColorPaletteProp, TextareaPropsColorOverrides>;
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
       * Maximum number of rows to display.
       */
      maxRows?: string | number;
      /**
       * Minimum number of rows to display.
       * @default 1
       */
      minRows?: string | number;
      /**
       * Leading adornment for this input.
       */
      startDecorator?: React.ReactNode;
      /**
       * The size of the component.
       * @default 'md'
       */
      size?: OverridableStringUnion<'sm' | 'md' | 'lg', TextareaPropsSizeOverrides>;
      /**
       * The system prop that allows defining system overrides as well as additional CSS styles.
       */
      sx?: SxProps;
      /**
       * The [global variant](https://mui.com/joy-ui/main-features/global-variants/) to use.
       * @default 'outlined'
       */
      variant?: OverridableStringUnion<VariantProp, TextareaPropsVariantOverrides>;
    };
  defaultComponent: D;
}

export type TextareaProps<
  D extends React.ElementType = TextareaTypeMap['defaultComponent'],
  P = {
    component?: React.ElementType;
  },
> = OverrideProps<TextareaTypeMap<P, D>, D>;

export interface TextareaOwnerState extends ApplyColorInversion<TextareaProps> {
  /**
   * If `true`, the input is focused.
   */
  focused: boolean;
  /**
   * @internal
   */
  instanceColor: OverridableStringUnion<ColorPaletteProp, TextareaPropsColorOverrides> | undefined;
}
