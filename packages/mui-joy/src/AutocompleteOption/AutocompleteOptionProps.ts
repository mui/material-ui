import * as React from 'react';
import { OverrideProps, OverridableStringUnion } from '@mui/types';
import { ColorPaletteProp, VariantProp, SxProps, ApplyColorInversion } from '../styles/types';

export type AutocompleteOptionSlot = 'root';

export interface AutocompleteOptionPropsColorOverrides {}
export interface AutocompleteOptionPropsVariantOverrides {}

export interface AutocompleteOptionTypeMap<P = {}, D extends React.ElementType = 'li'> {
  props: P & {
    /**
     * The color of the component. It supports those theme colors that make sense for this component.
     * @default 'neutral'
     */
    color?: OverridableStringUnion<ColorPaletteProp, AutocompleteOptionPropsColorOverrides>;
    /**
     * The [global variant](https://mui.com/joy-ui/main-features/global-variants/) to use.
     * @default 'plain'
     */
    variant?: OverridableStringUnion<VariantProp, AutocompleteOptionPropsVariantOverrides>;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps;
  };
  defaultComponent: D;
}

export type AutocompleteOptionProps<
  D extends React.ElementType = AutocompleteOptionTypeMap['defaultComponent'],
  P = {
    component?: React.ElementType;
  },
> = OverrideProps<AutocompleteOptionTypeMap<P, D>, D>;

export interface AutocompleteOptionOwnerState
  extends ApplyColorInversion<AutocompleteOptionProps> {}
