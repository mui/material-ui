import * as React from 'react';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';

export interface ImageListTypeMap<P = {}, D extends React.ElementType = 'ul'> {
  props: P & {
    /**
     * The height of one row in px.
     * Set to `'auto'` to let the children determine the height.
     * @default 180
     */
    rowHeight?: number | 'auto';
    /**
     * Image list items that will be in the image list.
     */
    children: NonNullable<React.ReactNode>;
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: {
      /** Styles applied to the root element. */
      root?: string;
    };
    /**
     * Number of columns.
     * @default 2
     */
    cols?: number;
    /**
     * Number of px for the spacing between items.
     * @default 4
     */
    spacing?: number;
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
