import * as React from 'react';
import { OverridableStringUnion, OverrideProps } from '@mui/types';
import { UseSwitchProps } from '@mui/base/SwitchUnstyled';
import { SxProps } from '../styles/defaultTheme';
import { ColorPaletteProp, VariantProp } from '../styles/types';

export type CheckboxSlot = 'root' | 'input';

export interface CheckboxPropsVariantOverrides {}

export interface CheckboxPropsColorOverrides {}

export interface CheckboxPropsSizeOverrides {}

export interface CheckboxTypeMap<P = {}, D extends React.ElementType = 'span'> {
  props: P &
    UseSwitchProps & {
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
       * The component used for the Root slot.
       * Either a string to use a HTML element or a component.
       */
      component?: React.ElementType;
      /**
       * The color of the component. It supports those theme colors that make sense for this component.
       * @default 'neutral'
       */
      color?: OverridableStringUnion<
        Exclude<ColorPaletteProp, 'context'>,
        CheckboxPropsColorOverrides
      >;
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
       * @default <IndeterminateCheckBoxIcon />
       */
      indeterminateIcon?: React.ReactNode;
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
       * The variant to use.
       * @default 'contained'
       */
      variant?: OverridableStringUnion<Exclude<VariantProp, 'text'>, CheckboxPropsVariantOverrides>;
    };
  defaultComponent: D;
}

export type CheckboxProps<
  D extends React.ElementType = CheckboxTypeMap['defaultComponent'],
  P = {
    component?: React.ElementType;
  },
> = OverrideProps<CheckboxTypeMap<P, D>, D>;
