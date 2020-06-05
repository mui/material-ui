import * as React from 'react';
import { StandardProps } from '@material-ui/core';

export interface TimelineItemDotProps extends StandardProps<{}, TimelineItemDotClassKey> {
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

export type TimelineItemDotClassKey = 'root';

/**
 *
 * API:
 *
 * - [TimelineItemDot API](https://material-ui.com/api/timeline-item-dot/)
 */
export default function TimelineItemDot(props: TimelineItemDotProps): JSX.Element;
