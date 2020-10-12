import * as React from 'react';
import { OverridableStringUnion } from '@material-ui/types';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';

export interface ImageListPropsVariantOverrides {}
export type ImageListVariantDefaults = Record<'masonry' | 'quilted' | 'standard' | 'woven', true>;
export interface ImageListTypeMap<P = {}, D extends React.ElementType = 'ul'> {
  props: P & {
    /**
     * Items that will be in the image list.
     */
    children: NonNullable<React.ReactNode>;
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: {
      root?: string;
      masonry?: string;
      quilted?: string;
      standard?: string;
      woven?: string;
    };
    /**
     * Number of columns.
     * @default 2
     */
    cols?: number;
    /**
     * The gap between items in px.
     * @default 4
     */
    gap?: number;
    /**
     * The height of one row in px.
     * @default 'auto'
     */
    rowHeight?: number | 'auto';
    /**
     * The variant to use.
     * @default 'standard'
     */
    variant?: OverridableStringUnion<ImageListVariantDefaults, ImageListPropsVariantOverrides>;
  };
  defaultComponent: D;
}
/**
 *
 * Demos:
 *
 * - [Image List](https://material-ui.com/components/image-list/)
 *
 * API:
 *
 * - [ImageList API](https://material-ui.com/api/image-list/)
 */
declare const ImageList: OverridableComponent<ImageListTypeMap>;

export type ImageListClassKey = keyof NonNullable<ImageListTypeMap['props']['classes']>;

export type ImageListProps<
  D extends React.ElementType = ImageListTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<ImageListTypeMap<P, D>, D>;

export default ImageList;
