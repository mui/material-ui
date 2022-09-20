import * as React from 'react';
import { OverridableStringUnion, OverrideProps } from '@mui/types';
import { ColorPaletteProp, VariantProp, SxProps } from '../styles/types';

export type ListSubheaderSlot = 'root';

export interface ListSubheaderVariantOverrides {}

export interface ListSubheaderColorOverrides {}

export interface ListSubheaderTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {
    /**
     * The color of the component. It supports those theme colors that make sense for this component.
     * @default 'neutral'
     */
    color?: OverridableStringUnion<ColorPaletteProp, ListSubheaderColorOverrides>;
    /**
     * The content of the component.
     */
    children?: React.ReactNode;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps;
    /**
     * If `true`, the component has sticky position (with top = 0).
     * @default false
     */
    sticky?: boolean;
    /**
     * The variant to use.
     * @default 'plain'
     */
    variant?: OverridableStringUnion<VariantProp, ListSubheaderVariantOverrides>;
  };
  defaultComponent: D;
}

export type ListSubheaderProps<
  D extends React.ElementType = ListSubheaderTypeMap['defaultComponent'],
  P = {
    component?: React.ElementType;
  },
> = OverrideProps<ListSubheaderTypeMap<P, D>, D>;

export interface ListSubheaderOwnerState extends ListSubheaderProps {}
