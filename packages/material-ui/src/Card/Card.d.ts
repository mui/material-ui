import * as React from 'react';
import { StandardProps } from '..';
import { PaperProps } from '../Paper';

export interface CardProps<C = {}> extends StandardProps<PaperProps<C>, CardClassKey> {
  raised?: boolean;
}

export type CardClassKey = 'root';

declare class Card<C> extends React.Component<C & CardProps<C>> {}

export default Card;
