import * as React from 'react';
import { StandardProps } from '..';
import { PaperProps } from '../Paper';

export interface CardProps extends StandardProps<PaperProps, CardClassKey> {
  raised?: boolean;
}

export type CardClassKey = 'root';

declare const Card: React.ComponentType<CardProps>;

export default Card;
