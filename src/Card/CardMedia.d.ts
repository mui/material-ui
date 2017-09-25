import * as React from 'react';
import { StyledComponent } from '..';

export interface CardMediaProps extends React.HTMLAttributes<HTMLDivElement> {
  image?: string;
  src?: string;
  component?: React.ReactType;
}

declare const CardMedia: StyledComponent<CardMediaProps>;

export default CardMedia;
