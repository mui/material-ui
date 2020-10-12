import { InternalStandardProps as StandardProps } from '..';
import { InputBaseProps } from '../InputBase';

export interface FilledInputProps extends StandardProps<InputBaseProps> {
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: {
    root?: string;
    colorSecondary?: string;
    underline?: string;
    focused?: string;
    disabled?: string;
    adornedStart?: string;
    adornedEnd?: string;
    error?: string;
    marginDense?: string;
    multiline?: string;
    hiddenLabel?: string;
    input?: string;
    inputMarginDense?: string;
    inputHiddenLabel?: string;
    inputMultiline?: string;
    inputAdornedStart?: string;
    inputAdornedEnd?: string;
  };
  /**
   * If `true`, the input will not have an underline.
   */
  disableUnderline?: boolean;
}

export type FilledInputClassKey = keyof NonNullable<FilledInputProps['classes']>;

/**
 *
 * Demos:
 *
 * - [Text Fields](https://material-ui.com/components/text-fields/)
 *
 * API:
 *
 * - [FilledInput API](https://material-ui.com/api/filled-input/)
 * - inherits [InputBase API](https://material-ui.com/api/input-base/)
 */
export default function FilledInput(props: FilledInputProps): JSX.Element;
