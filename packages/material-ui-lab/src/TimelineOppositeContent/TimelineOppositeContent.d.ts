import * as React from 'react';
import { StandardProps } from '@material-ui/core';

export interface TimelineOppositeContentProps
  extends StandardProps<{}, TimelineOppositeContentClassKey> {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component?: React.ElementType<React.HTMLAttributes<HTMLElement>>;
}

export type TimelineOppositeContentClassKey = 'root' | 'alignRight';

/**
 *
 * Demos:
 *
 * - [Timeline](https://material-ui.com/components/timeline/)
 *
 * API:
 *
 * - [TimelineOppositeContent API](https://material-ui.com/api/timeline-opposite-content/)
 */
export default function TimelineOppositeContent(props: TimelineOppositeContentProps): JSX.Element;
