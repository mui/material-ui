import * as React from 'react';
import { OverrideProps, OverridableStringUnion } from '@mui/types';
import { SlotComponentProps } from '@mui/base/utils';
import {
  ColorPaletteProp,
  TypographySystem,
  SxProps,
  SystemProps,
  VariantProp,
} from '../styles/types';

export type TypographySlot = 'root' | 'startDecorator' | 'endDecorator';

export interface TypographyPropsColorOverrides {}

export interface TypographyPropsVariantOverrides {}

interface ComponentsProps {
  root?: SlotComponentProps<'a', { sx?: SxProps }, TypographyOwnerState>;
  startDecorator?: SlotComponentProps<'span', { sx?: SxProps }, TypographyOwnerState>;
  endDecorator?: SlotComponentProps<'span', { sx?: SxProps }, TypographyOwnerState>;
}

export interface TypographyTypeMap<P = {}, D extends React.ElementType = 'span'> {
  props: P &
    Omit<SystemProps, 'color'> & {
      /**
       * The content of the component.
       */
      children?: React.ReactNode;
      /**
       * The color of the component. It supports those theme colors that make sense for this component.
       */
      color?: OverridableStringUnion<ColorPaletteProp, TypographyPropsColorOverrides>;
      /**
       * The props used for each slot inside the component.
       * @default {}
       */
      componentsProps?: ComponentsProps;
      /**
       * Element placed after the children.
       */
      endDecorator?: React.ReactNode;
      /**
       * If `true`, the text will have a bottom margin.
       * @default false
       */
      gutterBottom?: boolean;
      /**
       * Applies the theme typography styles.
       * @default 'body1'
       */
      level?: keyof TypographySystem | 'inherit';
      /**
       * The component maps the variant prop to a range of different HTML element types.
       * For instance, body1 to `<h6>`.
       * If you wish to change that mapping, you can provide your own.
       * Alternatively, you can use the `component` prop.
       * @default {
       *   h1: 'h1',
       *   h2: 'h2',
       *   h3: 'h3',
       *   h4: 'h4',
       *   h5: 'h5',
       *   h6: 'h6',
       *   body1: 'p',
       *   body2: 'p',
       *   body3: 'p',
       *   inherit: 'p',
       * }
       */
      levelMapping?: Partial<Record<keyof TypographySystem | 'inherit', string>>;
      /**
       * If `true`, the text will not wrap, but instead will truncate with a text overflow ellipsis.
       *
       * Note that text overflow can only happen with block or inline-block level elements
       * (the element needs to have a width in order to overflow).
       * @default false
       */
      noWrap?: boolean;
      /**
       * Element placed before the children.
       */
      startDecorator?: React.ReactNode;
      /**
       * The system color.
       */
      textColor?: SystemProps['color'];
      /**
       * The system prop that allows defining system overrides as well as additional CSS styles.
       */
      sx?: SxProps;
      /**
       * The variant to use.
       */
      variant?: OverridableStringUnion<VariantProp, TypographyPropsVariantOverrides>;
    };
  defaultComponent: D;
}

export type TypographyProps<
  D extends React.ElementType = TypographyTypeMap['defaultComponent'],
  P = {
    component?: React.ElementType;
  },
> = OverrideProps<TypographyTypeMap<P, D>, D>;

export interface TypographyOwnerState extends TypographyProps {
  /**
   * If `true`, the element is rendered in a Typography.
   */
  nesting: boolean;
}
