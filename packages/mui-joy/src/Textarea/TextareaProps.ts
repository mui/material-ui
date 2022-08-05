import React from 'react';
import { OverridableStringUnion, OverrideProps } from '@mui/types';
import { ColorPaletteProp, VariantProp, SxProps } from '../styles/types';

export type TextareaSlot = 'root';

export interface TextareaPropsVariantOverrides {}

export interface TextareaPropsColorOverrides {}

export interface TextareaPropsSizeOverrides {}

export interface TextareaTypeMap<P = {}, D extends React.ElementType = 'textarea'> {
  props: P & {
    /**
     * The color of the component. It supports those theme colors that make sense for this component.
     * @default 'neutral'
     */
    color?: OverridableStringUnion<ColorPaletteProp, TextareaPropsColorOverrides>;
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
