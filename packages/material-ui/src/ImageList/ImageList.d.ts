import * as React from 'react';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';

export interface ImageListTypeMap<P = {}, D extends React.ElementType = 'ul'> {
  props: P & {
    /**
     * Cell height in `px`.
     * Set to `'auto'` to let the children determine the height.
     * @deprecated Use rowHeight instead.
     */
    cellHeight?: number | 'auto';
    /**
     * Items that will be in the image list.
     */
    children?: React.ReactNode;
    /**
     * Number of columns.
     */
    cols?: number;
    /**
     * The gap between items in `px`.
     */
    gap?: number;
    /**
     * The height of one row in `px`.
     */
    rowHeight?: number | 'auto';
    /**
     * The spacing between items in `px`.
     * @deprecated Use gap instead.
     */
    spacing?: number;
  };
  defaultComponent: D;
  classKey: ImageListClassKey;
}
/**
 *
 * Demos:
 *
 * - [Image List](https://mui.com/components/image-list/)
 *
 * API:
 *
 * - [ImageList API](https://mui.com/api/image-list/)
 */
declare const ImageList: OverridableComponent<ImageListTypeMap>;

export type ImageListClassKey = 'root';

export type ImageListProps<
  D extends React.ElementType = ImageListTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<ImageListTypeMap<P, D>, D>;

export default ImageList;
