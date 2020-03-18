import * as React from 'react';
import { StandardProps } from '..';
import { InputBaseProps, InputBaseClassKey } from '../InputBase';

export interface FilledInputProps extends StandardProps<InputBaseProps, FilledInputClassKey> {
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
declare const FilledInput: React.ComponentType<FilledInputProps>;

export default FilledInput;
