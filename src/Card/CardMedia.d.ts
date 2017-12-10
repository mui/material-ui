import * as React from 'react';
import { StandardProps } from '..';

export interface CardMediaProps extends StandardProps<
  React.HTMLAttributes<HTMLDivElement>,
  CardMediaClassKey
> {
  component?: string | React.ComponentType<CardMediaProps>;
  image?: string;
  src?: string;
}

export type CardMediaClassKey =
  | 'root'
  ;

declare const CardMedia: React.ComponentType<CardMediaProps>;

export default CardMedia;
