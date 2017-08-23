import * as React from 'react';
import { StyledComponent } from '..';
export interface CardActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  disableActionSpacing?: boolean;
}

export default class CardActions extends StyledComponent<CardActionsProps> {}
