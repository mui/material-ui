import { StandardProps } from '..';
import { InputBaseProps, InputBaseClassKey } from '../InputBase';

export interface FilledInputProps extends StandardProps<InputBaseProps, FilledInputClassKey> {
  /**
   * If `true`, the input will not have an underline.
   */
  disableUnderline?: boolean;
}

export type FilledInputClassKey = InputBaseClassKey | 'colorSecondary' | 'underline';

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
