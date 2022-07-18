import * as React from 'react';
import {
  OverridableComponent,
  OverridableStringUnion,
  OverridableTypeMap,
  OverrideProps,
} from '@mui/types';
import { OptionState } from '@mui/base/ListboxUnstyled';
import { ColorPaletteProp, VariantProp, SxProps } from '../styles/types';

export type OptionSlot = 'root';

export interface OptionPropsVariantOverrides {}

export interface OptionPropsColorOverrides {}

export interface OptionTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P &
    OptionState & {
      /**
       * The color of the component. It supports those theme colors that make sense for this component.
       * @default 'neutral'
       */
      color?: OverridableStringUnion<ColorPaletteProp, OptionPropsColorOverrides>;
      /**
       * The content of the component.
       */
      children?: React.ReactNode;
      /**
       * If `true`, the component is disabled.
       * @default false
       */
      disabled?: boolean;
      /**
       * A text representation of the option's content.
       * Used for keyboard text navigation matching.
       */
      label?: string;
      /**
       * Use to apply selected styling.
       * @default false
       */
      selected?: boolean;
      /**
       * The variant to use.
       * @default 'plain'
       */
      variant?: OverridableStringUnion<VariantProp, OptionPropsVariantOverrides>;
      /**
       * The option value.
       */
      value?: any;
      /**
       * The system prop that allows defining system overrides as well as additional CSS styles.
       */
      sx?: SxProps;
    };
  defaultComponent: D;
}

export interface ExtendOptionTypeMap<M extends OverridableTypeMap> {
  props: M['props'] & OptionTypeMap['props'];
  defaultComponent: M['defaultComponent'];
}

export type OptionProps<
  D extends React.ElementType = OptionTypeMap['defaultComponent'],
  P = {
    component?: React.ElementType;
  },
> = OverrideProps<OptionTypeMap<P, D>, D>;

export type ExtendOption<M extends OverridableTypeMap> = ((
  props: OverrideProps<ExtendOptionTypeMap<M>, 'a'>,
) => JSX.Element) &
  OverridableComponent<ExtendOptionTypeMap<M>>;
