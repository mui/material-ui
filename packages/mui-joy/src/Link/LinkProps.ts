import React from 'react';
import { OverridableStringUnion, OverrideProps } from '@mui/types';
import { SxProps } from '../styles/defaultTheme';
import { ColorPaletteProp, TypographySystem, VariantProp } from '../styles/types';

export type LinkSlot = 'root' | 'startDecorator' | 'endDecorator';

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
     * Element placed after the children.
     */
    endDecorator?: React.ReactNode;
    /**
     * Applies the theme typography styles.
     * @default 'body1'
     */
    level?: keyof TypographySystem | 'inherit';
    /**
     * If `true`, the ::after psuedo element is added to cover the area of interaction.
     * The parent of the overlay Link should have `relative` CSS position.
     * @default false
     */
    overlay?: boolean;
    /**
     * Element placed before the children.
     */
    startDecorator?: React.ReactNode;
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
