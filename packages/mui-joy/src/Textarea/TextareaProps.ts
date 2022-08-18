import React from 'react';
import { OverridableStringUnion, OverrideProps } from '@mui/types';
import { ColorPaletteProp, VariantProp, SxProps } from '../styles/types';

export type TextareaSlot = 'root';

export interface TextareaPropsVariantOverrides {}

export interface TextareaPropsColorOverrides {}

export interface TextareaPropsSizeOverrides {}

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
       * The props used for each slot inside the Input.
       * @default {}
       */
      componentsProps?: {
        root?: React.ComponentPropsWithRef<'div'>;
        textarea?: React.ComponentPropsWithRef<'textarea'> & {
          component?: React.ElementType;
          sx?: SxProps;
        };
      };
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
       * If `true`, the button will take up the full width of its container.
       * @default false
       */
      fullWidth?: boolean;
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

export default TextareaProps;
