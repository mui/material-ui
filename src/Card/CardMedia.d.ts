import * as React from 'react';
import { StyledComponent } from '..';

export interface CardMediaProps extends React.HTMLAttributes<HTMLDivElement> {
  image: string;
}

declare const CardMedia: StyledComponent<CardMediaProps>;

export default CardMedia;
