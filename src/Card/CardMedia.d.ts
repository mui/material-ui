import * as React from 'react';
import { StyledComponent } from '..';

export interface CardMediaProps extends React.HTMLAttributes<HTMLDivElement> {
  image: string;
}

export default class CardMedia extends StyledComponent<CardMediaProps> {}
