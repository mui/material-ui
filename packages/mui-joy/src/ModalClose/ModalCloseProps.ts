import * as React from 'react';
import { OverridableStringUnion, OverrideProps } from '@mui/types';
import { ColorPaletteProp, SxProps, VariantProp } from '../styles/types';

export type ModalCloseSlot = 'root';

export interface ModalClosePropsColorOverrides {}
export interface ModalClosePropsVariantOverrides {}
export interface ModalClosePropsSizeOverrides {}

export interface ModalCloseTypeMap<P = {}, D extends React.ElementType = 'button'> {
  props: P & {
    /**
     * The color of the component. It supports those theme colors that make sense for this component.
     * @default 'neutral'
     */
    color?: OverridableStringUnion<ColorPaletteProp, ModalClosePropsColorOverrides>;
    /**
     * The size of the component.
     * @default 'md'
     */
    size?: OverridableStringUnion<'sm' | 'md' | 'lg', ModalClosePropsSizeOverrides>;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps;
    /**
     * The variant to use.
     * @default 'plain'
     */
    variant?: OverridableStringUnion<VariantProp, ModalClosePropsVariantOverrides>;
  };
  defaultComponent: D;
}

export type ModalCloseProps<
  D extends React.ElementType = ModalCloseTypeMap['defaultComponent'],
  P = { component?: React.ElementType },
> = OverrideProps<ModalCloseTypeMap<P, D>, D>;
