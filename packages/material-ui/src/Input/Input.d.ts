import { InternalStandardProps as StandardProps } from '..';
import { InputBaseProps } from '../InputBase';

export interface InputProps extends StandardProps<InputBaseProps> {
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: {
    /** Styles applied to the root element. */
    root?: string;
    /** Styles applied to the root element if the component is a descendant of `FormControl`. */
    formControl?: string;
    /** Styles applied to the root element if the component is focused. */
    focused?: string;
    /** Styles applied to the root element if `disabled={true}`. */
    disabled?: string;
    /** Styles applied to the root element if color secondary. */
    colorSecondary?: string;
    /** Styles applied to the root element unless `disableUnderline={true}`. */
    underline?: string;
    /** Pseudo-class applied to the root element if `error={true}`. */
    error?: string;
    /** Styles applied to the input element if `size="small"`. */
    sizeSmall?: string;
    /** Styles applied to the root element if `multiline={true}`. */
    multiline?: string;
    /** Styles applied to the root element if `fullWidth={true}`. */
    fullWidth?: string;
    /** Styles applied to the input element. */
    input?: string;
    /** Styles applied to the input element if `size="small"`. */
    inputSizeSmall?: string;
    /** Styles applied to the input element if `multiline={true}`. */
    inputMultiline?: string;
    /** Styles applied to the input element if `type="search"`. */
    inputTypeSearch?: string;
  };
  /**
   * If `true`, the `input` will not have an underline.
   */
  disableUnderline?: boolean;
}

export type InputClassKey = keyof NonNullable<InputProps['classes']>;

/**
 *
 * Demos:
 *
 * - [Text Fields](https://material-ui.com/components/text-fields/)
 *
 * API:
 *
 * - [Input API](https://material-ui.com/api/input/)
 * - inherits [InputBase API](https://material-ui.com/api/input-base/)
 */
export default function Input(props: InputProps): JSX.Element;
