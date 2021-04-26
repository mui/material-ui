import { ParseableDate } from '../internal/pickers/constants/prop-types';
import { BasePickerProps } from '../internal/pickers/typings/BasePicker';

export type RangeInput<TDate> = [ParseableDate<TDate>, ParseableDate<TDate>];
export type DateRange<TDate> = [TDate | null, TDate | null];
export type NonEmptyDateRange<TDate> = [TDate, TDate];

export type AllSharedDateRangePickerProps<TDate> = Omit<
  BasePickerProps<RangeInput<TDate>, DateRange<TDate>>,
  'orientation'
> &
  import('./DateRangePickerInput').ExportedDateRangePickerInputProps;

export interface CurrentlySelectingRangeEndProps {
  currentlySelectingRangeEnd: 'start' | 'end';
  setCurrentlySelectingRangeEnd: (newSelectingEnd: 'start' | 'end') => void;
}
