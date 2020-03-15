import * as React from 'react';
import { StandardProps } from '..';

export interface CardContentProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, CardContentClassKey> {
  component?: React.ElementType<React.HTMLAttributes<HTMLDivElement>>;
}

export type CardContentClassKey = 'root';

/**
 *
 *
 * Demos:
 * - {@link https://material-ui.com/components/cards/ Cards}
 *
 * API:
 * - {@link https://material-ui.com/api/card-content/ CardContent API}
 *
 */
declare const CardContent: React.ComponentType<CardContentProps>;

export default CardContent;
