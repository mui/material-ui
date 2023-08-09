import * as React from 'react';
import { SxProps } from '@mui/system';
import { OverridableStringUnion } from '@mui/types';
import { Theme } from '../styles';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';
import { AvatarClasses } from './avatarClasses';

export interface AvatarPropsVariantOverrides {}

export interface AvatarTypeMap<
  AdditionalProps = {},
  DefaultComponent extends React.ElementType = 'div',
> {
  props: AdditionalProps & {
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
    classes?: Partial<AvatarClasses>;
    /**
     * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attributes) applied to the `img` element if the component is used to display an image.
     * It can be used to listen for the loading error event.
     */
    imgProps?: React.ImgHTMLAttributes<HTMLImageElement> & {
      sx?: SxProps<Theme>;
    };
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
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps<Theme>;
    /**
     * The shape of the avatar.
     * @default 'circular'
     */
    variant?: OverridableStringUnion<
      'circular' | 'rounded' | 'square',
      AvatarPropsVariantOverrides
    >;
  };
  defaultComponent: DefaultComponent;
}

/**
 *
 * Demos:
 *
 * - [Avatar](https://mui.com/material-ui/react-avatar/)
 *
 * API:
 *
 * - [Avatar API](https://mui.com/material-ui/api/avatar/)
 */
declare const Avatar: OverridableComponent<AvatarTypeMap>;

export type AvatarProps<
  RootComponent extends React.ElementType = AvatarTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<AvatarTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType;
};

export default Avatar;
