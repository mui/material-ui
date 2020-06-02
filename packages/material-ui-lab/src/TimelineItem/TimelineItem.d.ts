import * as React from 'react';
import { StandardProps } from '@material-ui/core';

export interface TimelineItemProps extends StandardProps<{}, TimelineItemClassKey> {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;

  /**
   * The variant to use.
   */
  variant?: 'standard' | 'outlined';
}

export type TimelineItemClassKey =
  | 'root'

/**
 *
 * API:
 *
 * - [TimelineItem API](https://material-ui.com/api/timeline-item/)
 */
export default function TimelineItem(props: TimelineItemProps): JSX.Element;