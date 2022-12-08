import * as React from 'react';
import { OverridableStringUnion, OverrideProps } from '@mui/types';
import { SlotComponentProps } from '@mui/base/utils';
import { ColorPaletteProp, VariantProp, SxProps } from '../styles/types';

export type AvatarSlot = 'root' | 'img' | 'fallback';

export interface AvatarPropsColorOverrides {}
export interface AvatarPropsVariantOverrides {}
export interface AvatarPropsSizeOverrides {}

interface ComponentsProps {
  root?: SlotComponentProps<'div', { sx?: SxProps }, AvatarOwnerState>;
  img?: SlotComponentProps<'img', { sx?: SxProps }, AvatarOwnerState>;
  fallback?: SlotComponentProps<'svg', { sx?: SxProps }, AvatarOwnerState>;
}

export interface AvatarTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {
    /**
     * Used in combination with `src` or `srcSet` to
     * provide an alt attribute for the rendered `img` element.
     */
    alt?: string;
    /**
     * Used to render icon or text elements inside the Avatar if `src` is not set.
     * This can be an element, or just a string.
     */
    children?: React.ReactNode;
    /**
     * The props used for each slot inside the component.
     * @default {}
     */
    componentsProps?: ComponentsProps;
    /**
     * The color of the component. It supports those theme colors that make sense for this component.
     * @default 'neutral'
     */
    color?: OverridableStringUnion<ColorPaletteProp, AvatarPropsColorOverrides>;
    /**
     * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attributes) applied to the `img` element if the component is used to display an image.
     * It can be used to listen for the loading error event.
     */
    imgProps?: React.ImgHTMLAttributes<HTMLImageElement> & {
      sx?: SxProps;
    };
    /**
     * The size of the component.
     * It accepts theme values between 'sm' and 'lg'.
     * @default 'md'
     */
    size?: OverridableStringUnion<'sm' | 'md' | 'lg', AvatarPropsSizeOverrides>;
    /**
     * The `src` attribute for the `img` element.
     */
    src?: string;
    /**
     * The `srcSet` attribute for the `img` element.
     * Use this attribute for responsive image display.
     */
    srcSet?: string;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps;
    /**
     * The variant to use.
     * @default 'soft'
     */
    variant?: OverridableStringUnion<VariantProp, AvatarPropsVariantOverrides>;
  };
  defaultComponent: D;
}

export type AvatarProps<
  D extends React.ElementType = AvatarTypeMap['defaultComponent'],
  P = { component?: React.ElementType },
> = OverrideProps<AvatarTypeMap<P, D>, D>;

export interface AvatarOwnerState extends AvatarProps {
  /**
   * The avatar is wrapped by AvatarGroup component.
   */
  grouped: boolean;
}
