import { OverridableComponent, OverridableStringUnion, OverrideProps } from '@mui/types';
import * as React from 'react';
import { SxProps } from '../styles/defaultTheme';
import { ColorPaletteProp, VariantProp } from '../styles/types';

export interface PaperPropsColorOverrides {}
export interface PaperPropsVariantOverrides {}

export interface PaperTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {
    /**
     * The content of the component.
     */
    children?: React.ReactNode;
    /**
     * The color of the component. It supports those theme colors that make sense for this component.
     * @default 'neutral'
     */
    color?: OverridableStringUnion<Exclude<ColorPaletteProp, 'context'>, PaperPropsColorOverrides>;
    /**
     * Shadow depth, corresponds to the `theme.shadow` scale.
     * It accepts theme values between 'xs' and 'xl'.
     */
    elevation?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps;
    /**
     * The variant to use.
     */
    variant?: OverridableStringUnion<VariantProp, PaperPropsVariantOverrides>;
  };
  defaultComponent: D;
}

declare const Paper: OverridableComponent<PaperTypeMap>;

export type PaperProps<
  D extends React.ElementType = PaperTypeMap['defaultComponent'],
  P = { component?: React.ElementType },
> = OverrideProps<PaperTypeMap<P, D>, D>;

export default Paper;
