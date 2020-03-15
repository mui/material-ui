import * as React from 'react';
import { StandardProps } from '..';
import { InputBaseProps, InputBaseClassKey } from '../InputBase';

export interface FilledInputProps extends StandardProps<InputBaseProps, FilledInputClassKey> {
  disableUnderline?: boolean;
}

export type FilledInputClassKey = InputBaseClassKey | 'colorSecondary' | 'underline';

/**
 *
 *
 * Demos:
 * - {@link https://material-ui.com/components/text-fields/ Text Fields}
 *
 * API:
 * - {@link https://material-ui.com/api/FilledInput FilledInput API}
 * - inherits {@link https://material-ui.com/api/input-base/ InputBase API}
 */
declare const FilledInput: React.ComponentType<FilledInputProps>;

export default FilledInput;
