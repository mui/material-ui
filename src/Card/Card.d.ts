import * as React from 'react';
import { StandardProps } from '..';
import { PaperProps, PaperClassKey } from '../Paper';

export interface CardProps extends StandardProps<
  PaperProps,
  CardClassKey
> {
  raised?: boolean;
}

export type CardClassKey =
  | PaperClassKey
  ;

declare const Card: React.ComponentType<CardProps>;

export default Card;
