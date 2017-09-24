import * as React from 'react';
import { StyledComponent } from '..';
export interface CardActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  disableActionSpacing?: boolean;
}

declare const CardActions: StyledComponent<CardActionsProps>;

export default CardActions;
