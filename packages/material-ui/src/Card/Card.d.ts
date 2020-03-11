import * as React from 'react';
import { StandardProps } from '..';
import { PaperProps } from '../Paper';

export interface CardProps extends StandardProps<PaperProps, CardClassKey> {
  raised?: boolean;
}

export type CardClassKey = 'root';

/**
 *
 *
 * Demos:
 * - {@link https://material-ui.com/components/cards Cards}
 *
 * API:
 * - {@link https://material-ui.com/api/Card Card API}
 * - inherits {@link https://material-ui.com/api//api/paper Paper API}
 */
declare const Card: React.ComponentType<CardProps>;

export default Card;
