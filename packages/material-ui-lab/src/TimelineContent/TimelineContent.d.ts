import * as React from 'react';
import { InternalStandardProps as StandardProps, TypographyProps } from '@material-ui/core';

export interface TimelineContentProps extends StandardProps<TypographyProps> {
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
    /** Styles applied to the root element if `align="right"`. */
    alignRight?: string;
  };
}

export type TimelineContentClassKey = keyof NonNullable<TimelineContentProps['classes']>;

/**
 *
 * Demos:
 *
 * - [Timeline](https://material-ui.com/components/timeline/)
 *
 * API:
 *
 * - [TimelineContent API](https://material-ui.com/api/timeline-content/)
 * - inherits [Typography API](https://material-ui.com/api/typography/)
 */
export default function TimelineContent(props: TimelineContentProps): JSX.Element;
