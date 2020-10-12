import * as React from 'react';
import { InternalStandardProps as StandardProps } from '..';
import { InputBaseProps } from '../InputBase';

export interface OutlinedInputProps extends StandardProps<InputBaseProps> {
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: {
    root?: string;
    colorSecondary?: string;
    focused?: string;
    disabled?: string;
    adornedStart?: string;
    adornedEnd?: string;
    error?: string;
    marginDense?: string;
    multiline?: string;
    notchedOutline?: string;
    input?: string;
    inputMarginDense?: string;
    inputMultiline?: string;
    inputAdornedStart?: string;
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
