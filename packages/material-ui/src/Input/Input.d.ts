import { InternalStandardProps as StandardProps } from '..';
import { InputBaseProps } from '../InputBase';

export interface InputProps extends StandardProps<InputBaseProps> {
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: {
    root?: string;
    formControl?: string;
    focused?: string;
    disabled?: string;
    colorSecondary?: string;
    underline?: string;
    error?: string;
    marginDense?: string;
    multiline?: string;
    fullWidth?: string;
    input?: string;
    inputMarginDense?: string;
    inputMultiline?: string;
    inputTypeSearch?: string;
  };
  /**
   * If `true`, the input will not have an underline.
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
