import * as React from 'react';
import { StandardProps } from '..';

export interface CardActionsProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, CardActionsClassKey> {
  disableSpacing?: boolean;
}

export type CardActionsClassKey = 'root' | 'spacing';

/**
 *
 *
 * Demos:
 * - {@link https://material-ui.com/components/cards/ Cards}
 *
 * API:
 * - {@link https://material-ui.com/api/CardActions CardActions API}
 *
 */
declare const CardActions: React.ComponentType<CardActionsProps>;

export default CardActions;
