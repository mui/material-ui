import * as React from 'react';
import { StandardProps } from '@material-ui/core';

export interface TimelineItemProps extends StandardProps<{}, TimelineItemClassKey> {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
}

export type TimelineItemClassKey =
  | 'root'
  | 'alignLeft'
  | 'alignRight'
  | 'alignAlternate'
  | 'missingOppositeContent';

/**
 *
 * Demos:
 *
 * - [Timeline](https://material-ui.com/components/timeline/)
 *
 * API:
 *
 * - [TimelineItem API](https://material-ui.com/api/timeline-item/)
 */
export default function TimelineItem(props: TimelineItemProps): JSX.Element;
