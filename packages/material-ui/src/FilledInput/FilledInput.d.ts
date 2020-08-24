import { InternalStandardProps as StandardProps } from '..';
import { InputBaseProps } from '../InputBase';

export interface FilledInputProps extends StandardProps<InputBaseProps> {
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: {
    /** Styles applied to the root element. */
    root?: string;
    /** Styles applied to the root element if color secondary. */
    colorSecondary?: string;
    /** Styles applied to the root element if `disableUnderline={false}`. */
    underline?: string;
    /** Pseudo-class applied to the root element if the component is focused. */
    focused?: string;
    /** Pseudo-class applied to the root element if `disabled={true}`. */
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
    /** Styles applied to the root element if `hiddenLabel={true}`. */
    hiddenLabel?: string;
    /** Styles applied to the `input` element. */
    input?: string;
    /** Styles applied to the `input` element if `margin="dense"`. */
    inputMarginDense?: string;
    /** Styles applied to the `input` if in `<FormControl hiddenLabel />`. */
    inputHiddenLabel?: string;
    /** Styles applied to the `input` element if `multiline={true}`. */
    inputMultiline?: string;
    /** Styles applied to the `input` element if `startAdornment` is provided. */
    inputAdornedStart?: string;
    /** Styles applied to the `input` element if `endAdornment` is provided. */
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
