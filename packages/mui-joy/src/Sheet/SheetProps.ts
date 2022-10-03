import { OverridableStringUnion, OverrideProps } from '@mui/types';
import * as React from 'react';
import { ColorPaletteProp, SxProps, VariantProp } from '../styles/types';

export type SheetSlot = 'root';

export interface SheetPropsColorOverrides {}
export interface SheetPropsVariantOverrides {}

export interface SheetTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {
    /**
     * The content of the component.
     */
    children?: React.ReactNode;
    /**
     * The color of the component. It supports those theme colors that make sense for this component.
     * @default 'neutral'
     */
    color?: OverridableStringUnion<ColorPaletteProp, SheetPropsColorOverrides>;
    /**
     * If `true`, the component create CSS variables that can override children with `context` color.
     * @default false
     */
    enableVariantOverride?: boolean;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps;
    /**
     * The variant to use.
     * @default 'plain'
     */
    variant?: OverridableStringUnion<VariantProp, SheetPropsVariantOverrides>;
  };
  defaultComponent: D;
}

export type SheetProps<
  D extends React.ElementType = SheetTypeMap['defaultComponent'],
  P = { component?: React.ElementType },
> = OverrideProps<SheetTypeMap<P, D>, D>;

export interface SheetOwnerState extends SheetProps {}
