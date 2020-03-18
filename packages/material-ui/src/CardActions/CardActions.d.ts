import * as React from 'react';
import { StandardProps } from '..';

export interface CardActionsProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, CardActionsClassKey> {
  disableSpacing?: boolean;
}

export type CardActionsClassKey = 'root' | 'spacing';

/**
 *
 * Demos:
 *
 * - [Cards](https://material-ui.com/components/cards/)
 *
 * API:
 *
 * - [CardActions API](https://material-ui.com/api/card-actions/)
 */
declare const CardActions: React.ComponentType<CardActionsProps>;

export default CardActions;
