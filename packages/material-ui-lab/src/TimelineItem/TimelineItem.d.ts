import * as React from 'react';
import { StandardProps } from '@material-ui/core';

export interface TimelineItemProps extends StandardProps<{}, TimelineItemClassKey> {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * See [CSS API](#css) below for more details.
   */
  classes?: {
    /** Styles applied to the root element. */
    root?: string;
    /** Styles applied to the root element if `align="left"`. */
    alignLeft?: string;
    /** Styles applied to the root element if `align="right"`. */
    alignRight?: string;
    /** Styles applied to the root element if `align="alternate"`. */
    alignAlternate?: string;
    /** Styles applied to the root element if no there isn't TimelineOppositeContent provided. */
    missingOppositeContent?: string;
    /** Styles applied to the timeline content node. */
    content?: string;
    /** Styles applied to the timeline opposite content node. */
    oppositeContent?: string;
  };
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
