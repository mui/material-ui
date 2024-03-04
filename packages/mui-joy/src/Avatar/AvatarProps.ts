import * as React from 'react';
import { OverridableStringUnion, OverrideProps } from '@mui/types';
import { ColorPaletteProp, SxProps, VariantProp, ApplyColorInversion } from '../styles/types';
import { CreateSlotsAndSlotProps, SlotProps } from '../utils/types';

export type AvatarSlot = 'root' | 'img' | 'fallback';

export interface AvatarSlots {
  /**
   * The component that renders the root.
   * @default 'div'
   */
  root?: React.ElementType;
  /**
   * The component that renders the img.
   * @default 'img'
   */
  img?: React.ElementType;
  /**
   * The component that renders the fallback.
   * @default 'svg'
   */
  fallback?: React.ElementType;
}

export interface AvatarPropsColorOverrides {}
export interface AvatarPropsVariantOverrides {}
export interface AvatarPropsSizeOverrides {}

export type AvatarSlotsAndSlotProps = CreateSlotsAndSlotProps<
  AvatarSlots,
  {
    root: SlotProps<'div', {}, AvatarOwnerState>;
    img: SlotProps<'img', {}, AvatarOwnerState>;
    fallback: SlotProps<'svg', {}, AvatarOwnerState>;
  }
>;

export interface AvatarTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P &
    AvatarSlotsAndSlotProps & {
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
       * The color of the component. It supports those theme colors that make sense for this component.
       * @default 'neutral'
       */
      color?: OverridableStringUnion<ColorPaletteProp, AvatarPropsColorOverrides>;
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
       * The [global variant](https://mui.com/joy-ui/main-features/global-variants/) to use.
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

export interface AvatarOwnerState extends ApplyColorInversion<AvatarProps> {
  /**
   * The avatar is wrapped by AvatarGroup component.
   */
  grouped: boolean;
}
