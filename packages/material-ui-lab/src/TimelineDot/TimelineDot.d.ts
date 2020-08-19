import * as React from 'react';
import { OverridableStringUnion } from '@material-ui/types';
import { StandardProps } from '@material-ui/core';

export interface TimelineDotPropsVariantOverrides {}
export type TimelineDotVariantDefaults = Record<'filled' | 'outlined', true>;

export interface TimelineDotProps extends StandardProps<{}, TimelineDotClassKey> {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * The dot can have a different colors.
   */
  color?: 'inherit' | 'primary' | 'secondary' | 'grey';
  /**
   * The dot can appear filled or outlined.
   */
  variant?: OverridableStringUnion<TimelineDotVariantDefaults, TimelineDotPropsVariantOverrides>;
}

export type TimelineDotClassKey =
  | 'root'
  | 'filled'
  | 'outlined'
  | 'filledDefault'
  | 'filledPrimary'
  | 'filledSecondary'
  | 'outlinedDefault'
  | 'outlinedPrimary'
  | 'outlinedSecondary';

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
