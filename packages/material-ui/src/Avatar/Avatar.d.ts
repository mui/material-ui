import * as React from 'react';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';

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
     */
    variant?: 'circle' | 'circular' | 'rounded' | 'square';
  };
  defaultComponent: D;
  classKey: AvatarClassKey;
}

/**
 *
 * Demos:
 *
 * - [Avatars](https://mui.com/components/avatars/)
 *
 * API:
 *
 * - [Avatar API](https://mui.com/api/avatar/)
 */
declare const Avatar: OverridableComponent<AvatarTypeMap>;

export type AvatarClassKey =
  | 'root'
  | 'colorDefault'
  | 'circle'
  | 'circular'
  | 'rounded'
  | 'square'
  | 'img'
  | 'fallback';

export type AvatarProps<
  D extends React.ElementType = AvatarTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<AvatarTypeMap<P, D>, D>;

export default Avatar;
