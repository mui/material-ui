import * as React from 'react';
import { StyledComponent } from '..';

export interface CardMediaProps extends React.HTMLAttributes<HTMLDivElement> {
  image: string;
}

export type CardMediaClassKey =
  | 'root'
  ;

declare const CardMedia: StyledComponent<CardMediaProps, CardMediaClassKey>;

export default CardMedia;
