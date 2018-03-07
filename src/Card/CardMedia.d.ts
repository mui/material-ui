import * as React from 'react';
import { StandardProps } from '..';

export interface CardMediaProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, CardMediaClassKey> {
  component?: React.ReactType<CardMediaProps>;
  image?: string;
  src?: string;
}

export type CardMediaClassKey = 'root' | 'media';

declare const CardMedia: React.ComponentType<CardMediaProps>;

export default CardMedia;
