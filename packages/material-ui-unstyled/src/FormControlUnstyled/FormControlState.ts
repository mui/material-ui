import { FormControlUnstyledProps } from './FormControlUnstyledProps';

type ContextFromPropsKey = 'disabled' | 'error' | 'hiddenLabel' | 'required';

export interface FormControlState extends Pick<FormControlUnstyledProps, ContextFromPropsKey> {
  adornedStart: boolean;
  filled: boolean;
  focused: boolean;
  onBlur: () => void;
  onEmpty: () => void;
  onFilled: () => void;
  onFocus: () => void;
  registerEffect: () => void;
  setAdornedStart: (adornedStart: React.SetStateAction<boolean>) => void;
}

interface FormControlStateParams {
  props: any;
  states: (keyof FormControlState)[];
  muiFormControl: FormControlState;
}

export default function formControlState({
  props,
  states,
  muiFormControl,
}: FormControlStateParams) {
  return states.reduce((acc, state) => {
    acc[state] = props[state];

    if (muiFormControl) {
      if (typeof props[state] === 'undefined') {
        acc[state] = muiFormControl[state];
      }
    }

    return acc;
  }, {} as any);
}
