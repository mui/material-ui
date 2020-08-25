import * as React from 'react';
import { InternalStandardProps as StandardProps } from '@material-ui/core';

export interface TimelineProps extends StandardProps<React.HTMLAttributes<HTMLUListElement>> {
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
    /** Styles applied to the root element if `align="left"`. */
    alignLeft?: string;
    /** Styles applied to the root element if `align="right"`. */
    alignRight?: string;
    /** Styles applied to the root element if `align="alternate"`. */
    alignAlternate?: string;
  };
  /**
   * The position where the timeline's content should appear.
   */
  align?: 'left' | 'right' | 'alternate';
}

export type TimelineClassKey = keyof NonNullable<TimelineProps['classes']>;

/**
 *
 * Demos:
 *
 * - [Timeline](https://material-ui.com/components/timeline/)
 *
 * API:
 *
 * - [Timeline API](https://material-ui.com/api/timeline/)
 */
export default function Timeline(props: TimelineProps): JSX.Element;
