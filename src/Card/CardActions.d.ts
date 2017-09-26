import * as React from 'react';
import { StyledComponent } from '..';
export interface CardActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  disableActionSpacing?: boolean;
}

export type CardActionClassKey =
  | 'root'
  | 'actionSpacing'
  ;

declare const CardActions: StyledComponent<CardActionsProps, CardActionClassKey>;

export default CardActions;
