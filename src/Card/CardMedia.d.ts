import * as React from 'react';
import { StandardProps } from '..';

export interface CardMediaProps extends StandardProps<
  React.HTMLAttributes<HTMLDivElement>,
  CardMediaClassKey
> {
  image?: string;
  src?: string;
  component?: string | React.ComponentType<CardMediaProps>;
}

export type CardMediaClassKey =
  | 'root'
  ;

declare const CardMedia: React.ComponentType<CardMediaProps>;

export default CardMedia;
