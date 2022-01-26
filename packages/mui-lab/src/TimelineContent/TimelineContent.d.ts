import * as React from 'react';
import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';
import { InternalStandardProps as StandardProps, TypographyProps } from '@mui/material';
import { TimelineContentClasses } from './timelineContentClasses';

export interface TimelineContentProps extends StandardProps<TypographyProps> {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<TimelineContentClasses>;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
}

/**
 *
 * Demos:
 *
 * - [Timeline](https://mui.com/components/timeline/)
 *
 * API:
 *
 * - [TimelineContent API](https://mui.com/api/timeline-content/)
 * - inherits [Typography API](https://mui.com/api/typography/)
 */
export default function TimelineContent(props: TimelineContentProps): JSX.Element;
