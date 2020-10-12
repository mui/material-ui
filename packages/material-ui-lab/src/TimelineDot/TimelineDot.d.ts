import * as React from 'react';
import { OverridableStringUnion } from '@material-ui/types';
import { InternalStandardProps as StandardProps } from '@material-ui/core';

export interface TimelineDotPropsVariantOverrides {}
export type TimelineDotVariantDefaults = Record<'filled' | 'outlined', true>;

export interface TimelineDotProps extends StandardProps<React.HTMLAttributes<HTMLSpanElement>> {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: {
    root?: string;
    filled?: string;
    outlined?: string;
    filledGrey?: string;
    outlinedGrey?: string;
    filledPrimary?: string;
    outlinedPrimary?: string;
    filledSecondary?: string;
    outlinedSecondary?: string;
  };
  /**
   * The dot can have a different colors.
   * @default 'grey'
   */
  color?: 'inherit' | 'primary' | 'secondary' | 'grey';
  /**
   * The dot can appear filled or outlined.
   * @default 'filled'
   */
  variant?: OverridableStringUnion<TimelineDotVariantDefaults, TimelineDotPropsVariantOverrides>;
}

export type TimelineDotClassKey = keyof NonNullable<TimelineDotProps['classes']>;

/**
 *
 * Demos:
 *
 * - [Timeline](https://material-ui.com/components/timeline/)
 *
 * API:
 *
 * - [TimelineDot API](https://material-ui.com/api/timeline-dot/)
 */
export default function TimelineDot(props: TimelineDotProps): JSX.Element;
