import * as React from 'react';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';

export interface ImageListItemTypeMap<P = {}, D extends React.ElementType = 'li'> {
  props: P & {
    /**
     * While you can pass any node as children, the main use case is for an img.
     */
    children?: React.ReactNode;
    /**
     * Width of the item in number of grid columns.
     */
    cols?: number;
    /**
     * Height of the item in number of grid rows.
     */
    rows?: number;
  };
  defaultComponent: D;
  classKey: ImageListItemClassKey;
}
/**
 *
 * Demos:
 *
 * - [Image List](https://material-ui.com/components/image-list/)
 *
 * API:
 *
 * - [ImageListItem API](https://material-ui.com/api/image-list-item/)
 */
declare const ImageListItem: OverridableComponent<ImageListItemTypeMap>;

export type ImageListItemClassKey = 'root' | 'item' | 'imgFullHeight' | 'imgFullWidth';

export type ImageListItemProps<
  D extends React.ElementType = ImageListItemTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<ImageListItemTypeMap<P, D>, D>;

export default ImageListItem;
