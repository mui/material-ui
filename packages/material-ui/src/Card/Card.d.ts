import * as React from 'react';
import { StandardProps } from '..';
import { PaperProps } from '../Paper';

export interface CardProps extends StandardProps<PaperProps, CardClassKey> {
  /**
   * If `true`, the card will use raised styling.
   */
  raised?: boolean;
}

export type CardClassKey = 'root';

/**
 *
 * Demos:
 *
 * - [Cards](https://material-ui.com/components/cards/)
 *
 * API:
 *
 * - [Card API](https://material-ui.com/api/card/)
 * - inherits [Paper API](https://material-ui.com/api/paper/)
 */
export default function Card(props: CardProps): JSX.Element;
