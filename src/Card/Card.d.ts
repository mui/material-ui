import * as React from 'react';
import { StyledComponent } from '..';
import { PaperProps } from '../Paper';

export interface CardProps extends PaperProps {
  raised?: boolean;
}

declare const Card: StyledComponent<CardProps>;

export default Card;
