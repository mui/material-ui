import * as React from 'react';
import { InternalStandardProps as StandardProps } from '@material-ui/core';

export interface TimelineItemProps extends StandardProps<React.HTMLAttributes<HTMLDivElement>> {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: {
    root?: string;
    alignLeft?: string;
    alignRight?: string;
    alignAlternate?: string;
    missingOppositeContent?: string;
    content?: string;
    oppositeContent?: string;
  };
}

export type TimelineItemClassKey = keyof NonNullable<TimelineItemProps['classes']>;

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
