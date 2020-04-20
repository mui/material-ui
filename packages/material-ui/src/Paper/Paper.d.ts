import * as React from 'react';
import { StandardProps } from '..';

export interface PaperProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, PaperClassKey> {
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component?: React.ElementType<React.HTMLAttributes<HTMLElement>>;
  /**
   * Shadow depth, corresponds to `dp` in the spec.
   * It accepts values between 0 and 24 inclusive.
   */
  elevation?: number;
  /**
   * If `true`, rounded corners are disabled.
   */
  square?: boolean;
  /**
   * The variant to use.
   */
  variant?: 'elevation' | 'outlined';
}

export type PaperClassKey =
  | 'root'
  | 'rounded'
  | 'outlined'
  | 'elevation0'
  | 'elevation1'
  | 'elevation2'
  | 'elevation3'
  | 'elevation4'
  | 'elevation5'
  | 'elevation6'
  | 'elevation7'
  | 'elevation8'
  | 'elevation9'
  | 'elevation10'
  | 'elevation11'
  | 'elevation12'
  | 'elevation13'
  | 'elevation14'
  | 'elevation15'
  | 'elevation16'
  | 'elevation17'
  | 'elevation18'
  | 'elevation19'
  | 'elevation20'
  | 'elevation21'
  | 'elevation22'
  | 'elevation23'
  | 'elevation24';

/**
 *
 * Demos:
 *
 * - [Cards](https://material-ui.com/components/cards/)
 * - [Paper](https://material-ui.com/components/paper/)
 *
 * API:
 *
 * - [Paper API](https://material-ui.com/api/paper/)
 */
export default function Paper(props: PaperProps): JSX.Element;
