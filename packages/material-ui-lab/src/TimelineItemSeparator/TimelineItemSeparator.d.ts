import * as React from 'react';
import { StandardProps } from '@material-ui/core';

export interface TimelineItemSeparatorProps
  extends StandardProps<{}, TimelineItemSeparatorClassKey> {
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

export type TimelineItemSeparatorClassKey = 'root';

/**
 *
 * Demos:
 *
 * - [Timeline](https://material-ui.com/components/timeline/)
 *
 * API:
 *
 * - [TimelineItemSeparator API](https://material-ui.com/api/timeline-item-tail/)
 */
export default function TimelineItemSeparator(props: TimelineItemSeparatorProps): JSX.Element;
