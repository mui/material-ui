import * as React from 'react';
import { StandardProps } from '@material-ui/core';

export interface TimelineProps extends StandardProps<{}, TimelineClassKey> {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * The position where the timeline's content should appear.
   */
  align?: 'left' | 'right' | 'alternate';
}

export type TimelineClassKey = 'root' | 'alignLeft' | 'alignRight' | 'alignAlternate';

/**
 *
 * Demos:
 *
 * - [Timeline](https://mui.com/components/timeline/)
 *
 * API:
 *
 * - [Timeline API](https://mui.com/api/timeline/)
 */
export default function Timeline(props: TimelineProps): JSX.Element;
