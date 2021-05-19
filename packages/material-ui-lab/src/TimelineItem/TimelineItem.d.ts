import * as React from 'react';
import { SxProps } from '@material-ui/system';
import { Theme } from '@material-ui/core/styles';
import { InternalStandardProps as StandardProps } from '@material-ui/core';

export interface TimelineItemProps extends StandardProps<React.HTMLAttributes<HTMLDivElement>> {
  /**
   * The position where the timeline's item should appear.
   */
  position?: 'left' | 'right';
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: {
    /** Styles applied to the root element. */
    root?: string;
    /** Styles applied to the root element if `position="left"`. */
    positionLeft?: string;
    /** Styles applied to the root element if `position="right"`. */
    positionRight?: string;
    /** Styles applied to the root element if `position="alternate"`. */
    positionAlternate?: string;
    /** Styles applied to the root element if TimelineOppositeContent isn't provided. */
    missingOppositeContent?: string;
  };
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
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
