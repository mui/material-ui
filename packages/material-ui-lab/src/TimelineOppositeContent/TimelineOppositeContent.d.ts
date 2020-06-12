import * as React from 'react';
import { StandardProps, TypographyProps } from '@material-ui/core';

export interface TimelineOppositeContentProps
  extends StandardProps<TypographyProps, TimelineOppositeContentClassKey> {
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
 * - inherits [Typography API](https://material-ui.com/api/typography/)
 */
export default function TimelineOppositeContent(props: TimelineOppositeContentProps): JSX.Element;
