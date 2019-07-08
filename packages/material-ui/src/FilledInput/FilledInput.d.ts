import * as React from 'react';
import { StandardProps } from '..';
import { InputBaseProps, InputBaseClassKey } from '../InputBase';

export interface FilledInputProps extends StandardProps<InputBaseProps, FilledInputClassKey> {
  disableUnderline?: boolean;
}

export type FilledInputClassKey = InputBaseClassKey | 'underline';

declare const FilledInput: React.ComponentType<FilledInputProps>;

export default FilledInput;
