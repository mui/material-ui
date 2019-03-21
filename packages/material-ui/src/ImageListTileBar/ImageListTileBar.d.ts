import * as React from 'react';
import { StandardProps } from '..';

export interface ImageListTileBarProps extends StandardProps<{}, ImageListTileBarClassKey> {
  actionIcon?: React.ReactNode;
  actionPosition?: 'left' | 'right';
  subtitle?: React.ReactNode;
  title?: React.ReactNode;
  titlePosition?: 'top' | 'bottom';
}

export type ImageListTileBarClassKey =
  | 'root'
  | 'titlePositionBottom'
  | 'titlePositionTop'
  | 'rootSubtitle'
  | 'titleWrap'
  | 'titleWrapActionPosLeft'
  | 'titleWrapActionPosRight'
  | 'title'
  | 'subtitle'
  | 'actionIcon'
  | 'actionIconActionPosLeft';

declare const ImageListTileBar: React.ComponentType<ImageListTileBarProps>;

export default ImageListTileBar;
