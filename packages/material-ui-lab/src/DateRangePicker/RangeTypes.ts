import { ParsableDate } from '../internal/pickers/constants/prop-types';
import { AllSharedPickerProps } from '../internal/pickers/Picker/SharedPickerProps';

export type RangeInput<TDate> = [ParsableDate<TDate>, ParsableDate<TDate>];
export type DateRange<TDate> = [TDate | null, TDate | null];
export type NonEmptyDateRange<TDate> = [TDate, TDate];

export type AllSharedDateRangePickerProps<TDate> = Omit<
  AllSharedPickerProps<RangeInput<TDate>, DateRange<TDate>>,
  'renderInput' | 'orientation'
> &
  import('./DateRangePickerInput').ExportedDateRangePickerInputProps;

export interface CurrentlySelectingRangeEndProps {
  currentlySelectingRangeEnd: 'start' | 'end';
  setCurrentlySelectingRangeEnd: (newSelectingEnd: 'start' | 'end') => void;
}
