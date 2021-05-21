export { default } from './ClockPickerStandalone';

export type ClockPickerProps<TDate> =
  import('./ClockPickerStandalone').ClockPickerStandaloneProps<TDate>;
export type ClockPickerView = NonNullable<ClockPickerProps<unknown>['view']>;
