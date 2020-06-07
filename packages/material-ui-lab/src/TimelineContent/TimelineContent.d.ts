import * as React from 'react';
import { StandardProps } from '@material-ui/core';

export interface TimelineContentProps extends StandardProps<{}, TimelineContentClassKey> {
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

export type TimelineContentClassKey = 'root';

/**
 *
 * Demos:
 *
 * - [Timeline](https://material-ui.com/components/timeline/)
 *
 * API:
 *
 * - [TimelineContent API](https://material-ui.com/api/timeline-content/)
 */
export default function TimelineContent(props: TimelineContentProps): JSX.Element;
