import { InternalStandardProps as StandardProps } from '..';
import { PaperProps } from '../Paper';

export interface CardProps extends StandardProps<PaperProps> {
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: {
    /** Styles applied to the root element. */
    root?: string;
  };
  /**
   * If `true`, the card will use raised styling.
   * @default false
   */
  raised?: boolean;
}

export type CardClassKey = keyof NonNullable<CardProps['classes']>;

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
