import * as React from 'react';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';

export interface ImageListItemTypeMap<P = {}, D extends React.ElementType = 'li'> {
  props: P & {
    cols?: number;
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

export type ImageListItemClassKey = 'root' | 'tile' | 'imgFullHeight' | 'imgFullWidth';

export type ImageListItemProps<
  D extends React.ElementType = ImageListItemTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<ImageListItemTypeMap<P, D>, D>;

export default ImageListItem;
