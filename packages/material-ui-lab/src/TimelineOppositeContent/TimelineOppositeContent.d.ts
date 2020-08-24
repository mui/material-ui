import * as React from 'react';
import { InternalStandardProps as StandardProps, TypographyProps } from '@material-ui/core';

export interface TimelineOppositeContentProps extends StandardProps<TypographyProps> {
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

export type TimelineOppositeContentClassKey = keyof NonNullable<
  TimelineOppositeContentProps['classes']
>;

/**
 *
 * Demos:
 *
 * - [Timeline](https://material-ui.com/components/timeline/)
 *
 * API:
 *
 * - [TimelineOppositeContent API](https://material-ui.com/api/timeline-opposite-content/)
 * - inherits [Typography API](https://material-ui.com/api/typography/)
 */
export default function TimelineOppositeContent(props: TimelineOppositeContentProps): JSX.Element;
