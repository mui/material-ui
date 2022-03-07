import { OverridableStringUnion, OverrideProps } from '@mui/types';
import React from 'react';
import { SxProps } from '../styles/defaultTheme';
import { ColorPaletteProp, TypographySystem, VariantProp } from '../styles/types';

export type LinkSlot = 'root';

export interface LinkPropsVariantOverrides {}

export interface LinkPropsColorOverrides {}

export interface LinkTypeMap<P = {}, D extends React.ElementType = 'a'> {
  props: P & {
    /**
     * The content of the component.
     */
    children?: React.ReactNode;
    /**
     * The color of the link.
     * @default 'primary'
     */
    color?: OverridableStringUnion<Exclude<ColorPaletteProp, 'context'>, LinkPropsColorOverrides>;
    /**
     * If `true`, the component is disabled.
     * @default false
     */
    disabled?: boolean;
    /**
     * Applies the theme typography styles.
     * @default 'body1'
     */
    level?: keyof TypographySystem | 'inherit';
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps;
    /**
     * Controls when the link should have an underline.
     * @default 'hover'
     */
    underline?: 'none' | 'hover' | 'always';
    /**
     * Applies the theme link styles.
     * @default 'text'
     */
    variant?: OverridableStringUnion<VariantProp, LinkPropsVariantOverrides>;
  };
  defaultComponent: D;
}

export type LinkProps<
  D extends React.ElementType = LinkTypeMap['defaultComponent'],
  P = {
    component?: React.ElementType;
    focusVisible?: boolean;
  },
> = OverrideProps<LinkTypeMap<P, D>, D>;
