import * as React from 'react';
import { StandardProps } from '@material-ui/core';

export interface TimelineItemOppositeContentProps extends StandardProps<{}, TimelineItemOppositeContentClassKey> {
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

export type TimelineItemOppositeContentClassKey = 'root' | 'alignRight';

/**
 *
 * Demos:
 *
 * - [Timeline](https://material-ui.com/components/timeline/)
 *
 * API:
 *
 * - [TimelineItemOppositeContent API](https://material-ui.com/api/timeline-item-opposite-content/)
 */
export default function TimelineItemOppositeContent(props: TimelineItemOppositeContentProps): JSX.Element;
