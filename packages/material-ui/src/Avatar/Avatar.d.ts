import * as React from 'react';
import { OverridableStringUnion } from '@material-ui/types';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';

export interface AvatarPropsVariantOverrides {}
export type AvatarVariantDefaults = Record<'circular' | 'rounded' | 'square', true>;

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
     * Override or extend the styles applied to the component.
     */
    classes?: {
      /** Styles applied to the root element. */
      root?: string;
      /** Styles applied to the root element if not `src` or `srcSet`. */
      colorDefault?: string;
      /** Styles applied to the root element if `variant="circular"`. */
      circular?: string;
      /** Styles applied to the root element if `variant="rounded"`. */
      rounded?: string;
      /** Styles applied to the root element if `variant="square"`. */
      square?: string;
      /** Styles applied to the img element if either `src` or `srcSet` is defined. */
      img?: string;
      /** Styles applied to the fallback icon */
      fallback?: string;
    };
    /**
     * Attributes applied to the `img` element if the component is used to display an image.
     * It can be used to listen for the loading error event.
     */
    imgProps?: React.ImgHTMLAttributes<HTMLImageElement>;
    /**
     * The `sizes` attribute for the `img` element.
     */
    sizes?: string;
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
     * The shape of the avatar.
     * @default 'circular'
     */
    variant?: OverridableStringUnion<AvatarVariantDefaults, AvatarPropsVariantOverrides>;
  };
  defaultComponent: D;
}

/**
 *
 * Demos:
 *
 * - [Avatars](https://material-ui.com/components/avatars/)
 *
 * API:
 *
 * - [Avatar API](https://material-ui.com/api/avatar/)
 */
declare const Avatar: OverridableComponent<AvatarTypeMap>;

export type AvatarClassKey = keyof NonNullable<AvatarTypeMap['props']['classes']>;

export type AvatarProps<
  D extends React.ElementType = AvatarTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<AvatarTypeMap<P, D>, D>;

export default Avatar;
