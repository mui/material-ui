import * as React from 'react';
import { InternalStandardProps as StandardProps } from '..';
import { InputBaseProps } from '../InputBase';

export interface OutlinedInputProps extends StandardProps<InputBaseProps> {
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: {
    /** Styles applied to the root element. */
    root?: string;
    /** Styles applied to the root element if the color is secondary. */
    colorSecondary?: string;
    /** Styles applied to the root element if the component is focused. */
    focused?: string;
    /** Styles applied to the root element if `disabled={true}`. */
    disabled?: string;
    /** Styles applied to the root element if `startAdornment` is provided. */
    adornedStart?: string;
    /** Styles applied to the root element if `endAdornment` is provided. */
    adornedEnd?: string;
    /** Pseudo-class applied to the root element if `error={true}`. */
    error?: string;
    /** Styles applied to the `input` element if `margin="dense"`. */
    marginDense?: string;
    /** Styles applied to the root element if `multiline={true}`. */
    multiline?: string;
    /** Styles applied to the `NotchedOutline` element. */
    notchedOutline?: string;
    /** Styles applied to the `input` element. */
    input?: string;
    /** Styles applied to the `input` element if `margin="dense"`. */
    inputMarginDense?: string;
    /** Styles applied to the `input` element if `multiline={true}`. */
    inputMultiline?: string;
    /** Styles applied to the `input` element if `startAdornment` is provided. */
    inputAdornedStart?: string;
    /** Styles applied to the `input` element if `endAdornment` is provided. */
    inputAdornedEnd?: string;
  };
  /**
   * The label of the input. It is only used for layout. The actual labelling
   * is handled by `InputLabel`. If specified `labelWidth` is ignored.
   */
  label?: React.ReactNode;
  /**
   * The width of the label. Is ignored if `label` is provided. Prefer `label`
   * if the input label appears with a strike through.
   * @default 0
   */
  labelWidth?: number;
  /**
   * If `true`, the outline is notched to accommodate the label.
   */
  notched?: boolean;
}

export type OutlinedInputClassKey = keyof NonNullable<OutlinedInputProps['classes']>;

/**
 *
 * Demos:
 *
 * - [Text Fields](https://material-ui.com/components/text-fields/)
 *
 * API:
 *
 * - [OutlinedInput API](https://material-ui.com/api/outlined-input/)
 * - inherits [InputBase API](https://material-ui.com/api/input-base/)
 */
export default function OutlinedInput(props: OutlinedInputProps): JSX.Element;
