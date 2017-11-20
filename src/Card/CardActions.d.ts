import * as React from 'react';
import { StandardProps } from '..';

export interface CardActionsProps extends StandardProps<
  React.HTMLAttributes<HTMLDivElement>,
  CardActionClassKey
> {
  disableActionSpacing?: boolean;
}

export type CardActionClassKey =
  | 'root'
  | 'actionSpacing'
  ;

declare const CardActions: React.ComponentType<CardActionsProps>;

export default CardActions;
