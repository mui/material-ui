import * as React from 'react';
import { StandardProps } from '@material-ui/core';

export interface TimelineOppositeContentProps
  extends StandardProps<{}, TimelineOppositeContentClassKey> {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
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
