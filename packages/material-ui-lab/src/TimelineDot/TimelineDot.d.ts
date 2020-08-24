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
    /** Styles applied to the root element. */
    root?: string;
    /** Styles applied to the root element if `variant="filled"`. */
    filled?: string;
    /** Styles applied to the root element if `variant="outlined"`. */
    outlined?: string;
    /** Styles applied to the root element if `color="grey"` and `variant="filled"`. */
    filledGrey?: string;
    /** Styles applied to the root element if `color="grey"` and `variant="outlined"`. */
    outlinedGrey?: string;
    /** Styles applied to the root element if `color="primary"` and `variant="filled"`. */
    filledPrimary?: string;
    /** Styles applied to the root element if `color="primary"` and `variant="outlined"`. */
    outlinedPrimary?: string;
    /** Styles applied to the root element if `color="secondary"` and `variant="filled"`. */
    filledSecondary?: string;
    /** Styles applied to the root element if `color="secondary"` and `variant="outlined"`. */
    outlinedSecondary?: string;
  };
  /**
   * The dot can have a different colors.
   */
  color?: 'inherit' | 'primary' | 'secondary' | 'grey';
  /**
   * The dot can appear filled or outlined.
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
