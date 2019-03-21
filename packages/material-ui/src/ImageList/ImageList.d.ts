import * as React from 'react';
import { StandardProps } from '..';

export interface ImageListProps
  extends StandardProps<React.HTMLAttributes<HTMLUListElement>, ImageListClassKey> {
  cellHeight?: number | 'auto';
  cols?: number;
  component?: React.ElementType<ImageListProps>;
  spacing?: number;
}

export type ImageListClassKey = 'root';

declare const ImageList: React.ComponentType<ImageListProps>;

export default ImageList;
