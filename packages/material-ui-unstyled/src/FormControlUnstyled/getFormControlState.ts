import { FormControlUnstyledState } from "./FormControlContext";

export interface GetFormControlStateParams<T extends FormControlUnstyledState> {
  props: Partial<T>;
  states: (keyof T)[];
  muiFormControl: T;
}

export default function getFormControlState<T extends FormControlUnstyledState>({
  props,
  states,
  muiFormControl: formContext,
}: GetFormControlStateParams<T>): Partial<T> {
  return states.reduce((acc, stateKey) => {
    if (typeof props[stateKey] !== 'undefined') {
      acc[stateKey] = props[stateKey];
    } else if (formContext) {
      acc[stateKey] = formContext[stateKey];
    }

    return acc;
  }, {} as Partial<T>);
}
