import * as React from 'react';
import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';
import { InternalStandardProps as StandardProps } from '@mui/material/internal';
import { TimelineItemClasses } from './timelineItemClasses';

export interface TimelineItemProps extends StandardProps<React.HTMLAttributes<HTMLDivElement>> {
  /**
   * The position where the timeline's item should appear.
   */
  position?: 'left' | 'right' | 'alternate' | 'alternate-reverse' | undefined;
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<TimelineItemClasses> | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
}

/**
 *
 * Demos:
 *
 * - [Timeline](https://next.mui.com/material-ui/react-timeline/)
 *
 * API:
 *
 * - [TimelineItem API](https://next.mui.com/material-ui/api/timeline-item/)
 */
export default function TimelineItem(props: TimelineItemProps): React.JSX.Element;
