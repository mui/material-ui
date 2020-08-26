import * as React from 'react';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';

export interface ImageListTypeMap<P = {}, D extends React.ElementType = 'ul'> {
  props: P & {
    /**
     * Number of px for one cell height.
     * You can set `'auto'` if you want to let the children determine the height.
     */
    cellHeight?: number | 'auto';
    /**
     * Image Tiles that will be in Image List.
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
     */
    cols?: number;
    /**
     * Number of px for the spacing between tiles.
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
