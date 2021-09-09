export { default } from './ClockPickerStandalone';
export { clockPickerClasses } from './ClockPicker';
export type { ClockPickerClasses, ClockPickerClassKey } from './ClockPicker';

export type ClockPickerProps<TDate> =
  import('./ClockPickerStandalone').ClockPickerStandaloneProps<TDate>;
export type ClockPickerView = NonNullable<ClockPickerProps<unknown>['view']>;
