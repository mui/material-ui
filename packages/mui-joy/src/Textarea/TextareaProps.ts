import * as React from 'react';
import { OverridableStringUnion, OverrideProps } from '@mui/types';
import { SlotComponentProps } from '@mui/base/utils';
import { ColorPaletteProp, VariantProp, SxProps, ApplyColorInversion } from '../styles/types';

export type TextareaSlot = 'root' | 'textarea' | 'startDecorator' | 'endDecorator';

export interface TextareaPropsVariantOverrides {}
export interface TextareaPropsColorOverrides {}
export interface TextareaPropsSizeOverrides {}

interface ComponentsProps {
  root?: SlotComponentProps<
    'div',
    { component?: React.ElementType; sx?: SxProps },
    TextareaOwnerState
  >;
  textarea?: SlotComponentProps<
    'textarea',
    { component?: React.ElementType; sx?: SxProps },
    TextareaOwnerState
  >;
  startDecorator?: SlotComponentProps<
    'span',
    { component?: React.ElementType; sx?: SxProps },
    TextareaOwnerState
  >;
  endDecorator?: SlotComponentProps<
    'span',
    { component?: React.ElementType; sx?: SxProps },
    TextareaOwnerState
  >;
}

export interface TextareaTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P &
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
       * Replace the default slots.
       */
      slots?: {
        root?: React.ElementType;
        textarea?: React.ElementType;
        startDecorator?: React.ElementType;
        endDecorator?: React.ElementType;
      };
      /**
       * The props used for each slot inside the component.
       * @default {}
       */
      slotProps?: ComponentsProps;
      /**
       * Trailing adornment for this input.
       */
      endDecorator?: React.ReactNode;
      /**
       * If `true`, the `input` will indicate an error.
       * The prop defaults to the value (`false`) inherited from the parent FormControl component.
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
       * The variant to use.
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
}
