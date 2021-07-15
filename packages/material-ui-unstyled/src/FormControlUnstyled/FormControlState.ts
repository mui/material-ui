import { FormControlUnstyledProps } from './FormControlUnstyledProps';

type ContextFromPropsKey = 'disabled' | 'error' | 'required';

export interface FormControlState extends Pick<FormControlUnstyledProps, ContextFromPropsKey> {
  filled: boolean;
  focused: boolean;
  onBlur: () => void;
  onEmpty: () => void;
  onFilled: () => void;
  onFocus: () => void;
  registerEffect: () => void;
}

interface FormControlStateParams<T extends FormControlState> {
  props: Partial<T>;
  states: (keyof T)[];
  muiFormControl: T;
}

export default function formControlState<T extends FormControlState>({
  props,
  states,
  muiFormControl,
}: FormControlStateParams<T>): Partial<T> {
  return states.reduce((acc, state) => {
    if (muiFormControl && typeof props[state] === 'undefined') {
      acc[state] = muiFormControl[state];
    } else {
      acc[state] = props[state];
    }

    return acc;
  }, {} as Partial<T>);
}
