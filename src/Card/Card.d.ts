import * as React from 'react';
import { StyledComponent } from '..';
import { PaperProps } from '../Paper';

export interface CardProps extends PaperProps {
  raised?: boolean;
}

export type CardClassKey = never;

declare const Card: StyledComponent<CardProps, CardClassKey>;

export default Card;
