import * as React from 'react';
import { OverridableStringUnion, OverrideProps } from '@mui/types';
import { UseSwitchParameters } from '@mui/base/SwitchUnstyled';
import { ColorPaletteProp, VariantProp, SxProps } from '../styles/types';

export type RadioSlot = 'root' | 'radio' | 'action' | 'input' | 'label';

export interface RadioPropsVariantOverrides {}

export interface RadioPropsColorOverrides {}

export interface RadioPropsSizeOverrides {}

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
       * The component used for the Root slot.
       * Either a string to use a HTML element or a component.
       */
      component?: React.ElementType;
      /**
       * The props used for each slot inside the Input.
       * @default {}
       */
      componentsProps?: {
        root?: React.ComponentPropsWithRef<'span'> & { sx?: SxProps };
        radio?: React.ComponentPropsWithRef<'span'> & { sx?: SxProps };
        action?: React.ComponentPropsWithRef<'span'> & { sx?: SxProps };
        input?: React.ComponentPropsWithRef<'input'> & { sx?: SxProps };
        label?: React.ComponentPropsWithRef<'label'> & { sx?: SxProps };
      };
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
       * @default false;
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
       * The variant to use.
       * @default 'outlined'
       */
      variant?: OverridableStringUnion<VariantProp, RadioPropsVariantOverrides>;
      /**
       * The value of the component. The DOM API casts this to a string.
       */
      value?: unknown;
    };
  defaultComponent: D;
}

export type RadioProps<
  D extends React.ElementType = RadioTypeMap['defaultComponent'],
  P = {
    component?: React.ElementType;
  },
> = OverrideProps<RadioTypeMap<P, D>, D>;
