export { default } from './DayPicker';

export type DayPickerClassKey = import('./DayPicker').DayPickerClassKey;
export type DayPickerProps<TDate> = import('./DayPicker').DayPickerProps<TDate>;
export type DayPickerView = NonNullable<DayPickerProps<unknown>['view']>;
