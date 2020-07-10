import { ParsableDate } from '../constants/prop-types';
import { AllSharedPickerProps } from '../Picker/SharedPickerProps';
import { ExportedDateRangePickerInputProps } from './DateRangePickerInput';

export type RangeInput<TDate = unknown> = [ParsableDate<TDate>, ParsableDate<TDate>];
export type DateRange<TDate = unknown> = [TDate | null, TDate | null];

export type AllSharedDateRangePickerProps<TDate> = Omit<
  AllSharedPickerProps<RangeInput<TDate>, DateRange<TDate>>,
  'renderInput' | 'orientation'
> &
  ExportedDateRangePickerInputProps;

export interface CurrentlySelectingRangeEndProps {
  currentlySelectingRangeEnd: 'start' | 'end';
  setCurrentlySelectingRangeEnd: (newSelectingEnd: 'start' | 'end') => void;
}
