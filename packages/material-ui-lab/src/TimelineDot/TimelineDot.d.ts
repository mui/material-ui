import * as React from 'react';
import { StandardProps } from '@material-ui/core';

export interface TimelineDotProps extends StandardProps<{}, TimelineDotClassKey> {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component?: React.ElementType<React.HTMLAttributes<HTMLElement>>;
  /**
   * The dot can appear filled or outlined.
   */
  variant?: 'default' | 'outlined';
  /**
   * The dot can have a different colors.
   */
  color?: 'inherit' | 'primary' | 'secondary' | 'default';
}

export type TimelineDotClassKey =
  | 'root'
  | 'defaultDefault'
  | 'defaultPrimary'
  | 'defaultSecondary'
  | 'outlinedDefault'
  | 'outlinedPrimary'
  | 'outlinedSecondary';

/**
 *
 * API:
 *
 * - [TimelineDot API](https://material-ui.com/api/timeline-item-dot/)
 */
export default function TimelineDot(props: TimelineDotProps): JSX.Element;
