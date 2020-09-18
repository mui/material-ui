import * as React from 'react';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';

export interface ImageListTypeMap<P = {}, D extends React.ElementType = 'ul'> {
  props: P & {
    /**
     * Number of px for one cell height.
     * You can set `'auto'` if you want to let the children determine the height.
     * @deprecated use rowHeight instead.
     */
    cellHeight?: number | 'auto';
    /**
     * Number of columns.
     */
    cols?: number;
    /**
     * The gap between items in px.
     */
    gap?: number;
    /**
     * The height of one row in px.
     */
    rowHeight?: number | 'auto';
    /**
     * Number of px for the spacing between tiles.
     * @deprecated use gap instead.
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
 * - [Image List](https://material-ui.com/components/image-list/)
 *
 * API:
 *
 * - [ImageList API](https://material-ui.com/api/image-list/)
 */
declare const ImageList: OverridableComponent<ImageListTypeMap>;

export type ImageListClassKey = 'root';

export type ImageListProps<
  D extends React.ElementType = ImageListTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<ImageListTypeMap<P, D>, D>;

export default ImageList;
