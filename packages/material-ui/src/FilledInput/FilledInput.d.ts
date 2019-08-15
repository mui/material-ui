import * as React from 'react';
import { StandardProps } from '..';
import { InputBaseProps, InputBaseClassKey } from '../InputBase';

export interface FilledInputProps<V = unknown> extends StandardProps<InputBaseProps<V>, FilledInputClassKey> {
  disableUnderline?: boolean;
}

export type FilledInputClassKey = InputBaseClassKey | 'underline';

export default function FilledInput<V>(props: FilledInputProps<V>): JSX.Element;
