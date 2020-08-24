import * as React from 'react';
import { InternalStandardProps as StandardProps } from '..';

export interface CardActionsProps extends StandardProps<React.HTMLAttributes<HTMLDivElement>> {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: {
    /** Styles applied to the root element. */
    root?: string;
    /** Styles applied to the root element if `disableSpacing={false}`. */
    spacing?: string;
  };
  /**
   * If `true`, the actions do not have additional margin.
   */
  disableSpacing?: boolean;
}

export type CardActionsClassKey = keyof NonNullable<CardActionsProps['classes']>;

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
export default function CardActions(props: CardActionsProps): JSX.Element;
