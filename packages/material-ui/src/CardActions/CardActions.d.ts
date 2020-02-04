import * as React from 'react';
import { StandardProps } from '..';

export interface CardActionsProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, CardActionsClassKey> {
  disableSpacing?: boolean;
}

export type CardActionsClassKey = 'root' | 'spacing';

declare const CardActions: React.ComponentType<CardActionsProps>;

export default CardActions;
