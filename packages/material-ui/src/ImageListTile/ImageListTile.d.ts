import * as React from 'react';
import { StandardProps } from '..';

export interface ImageListTileProps
  extends StandardProps<React.HTMLAttributes<HTMLLIElement>, ImageListTileClassKey> {
  cols?: number;
  component?: React.ElementType<ImageListTileProps>;
  rows?: number;
}

export type ImageListTileClassKey = 'root' | 'tile' | 'imgFullHeight' | 'imgFullWidth';

declare const ImageListTile: React.ComponentType<ImageListTileProps>;

export default ImageListTile;
