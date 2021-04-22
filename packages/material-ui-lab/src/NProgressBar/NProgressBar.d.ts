import * as React from 'react';
import { SxProps } from '@material-ui/system';
import { OverridableStringUnion } from '@material-ui/types';
import { InternalStandardProps as StandardProps, Theme } from '@material-ui/core';

export interface NProgressBarPropsColorOverrides {}

export interface NProgressBarProps
  extends StandardProps<React.HTMLAttributes<HTMLSpanElement>, 'children'> {
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: {
    /** Styles applied to the root element. */
    root?: string;
    /** Styles applied to the root and bar2 element if `color="primary"`; bar2 if `variant="buffer"`. */
    colorPrimary?: string;
    /** Styles applied to the root and bar2 elements if `color="secondary"`; bar2 if `variant="buffer"`. */
    colorSecondary?: string;
    /** Styles applied to the layered bar1 and bar2 elements. */
    bar?: string;
    /** Styles applied to the bar elements if `color="primary"`. */
    barColorPrimary?: string;
    /** Styles applied to the bar elements if `color="secondary"`. */
    barColorSecondary?: string;
  };
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'primary'
   */
  color?: OverridableStringUnion<
    'primary' | 'secondary' | 'inherit',
    NProgressBarPropsColorOverrides
  >;
  /**
   * Change the default value of how long it should wait before actually showing the progress bar to
   * avoid just flashing the progress when loading fast.
   * Value in milliseconds.
   * @default 300
   */
  initialDelay?: number;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
}

export type NProgressBarClassKey = keyof NonNullable<NProgressBarProps['classes']>;

/**
 * Demos:
 *
 * - [NProgressBar](https://material-ui.com/components/nprogress/)
 *
 * API:
 *
 * - [NProgressBar API](https://material-ui.com/api/nprogress-bar/)
 */
export default function NProgressBar(props: NProgressBarProps): JSX.Element;
