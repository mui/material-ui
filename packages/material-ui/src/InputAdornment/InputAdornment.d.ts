import * as React from 'react';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';

export interface InputAdornmentTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {
    disablePointerEvents?: boolean;
    disableTypography?: boolean;
    position: 'start' | 'end';
    variant?: 'standard' | 'outlined' | 'filled';
  };
  defaultComponent: D;
  classKey: InputAdornmentClassKey;
}

declare const InputAdornment: OverridableComponent<InputAdornmentTypeMap>;

export type InputAdornmentClassKey =
  | 'root'
  | 'filled'
  | 'positionStart'
  | 'positionEnd'
  | 'disablePointerEvents'
  | 'hiddenLabel'
  | 'marginDense';

export type InputAdornmentProps<
  D extends React.ElementType = InputAdornmentTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<InputAdornmentTypeMap<P, D>, D>;

export default InputAdornment;
