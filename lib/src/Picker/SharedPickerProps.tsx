import { WrapperVariant } from '../wrappers/Wrapper';
import { DateTimePickerView } from '../DateTimePicker';
import { ParsableDate } from '../constants/prop-types';
import { BasePickerProps } from '../typings/BasePicker';
import { MaterialUiPickersDate } from '../typings/date';
import { DateValidationProps } from '../_helpers/text-field-helper';
import { WithDateAdapterProps } from '../_shared/withDateAdapterProp';
import { ExportedDateInputProps, DateInputProps } from '../_shared/PureDateInput';

export type AnyPickerView = DateTimePickerView;

export type AllSharedPickerProps<
  TInputValue = ParsableDate,
  TDateValue = MaterialUiPickersDate
> = BasePickerProps<TInputValue, TDateValue> &
  ExportedDateInputProps<TInputValue, TDateValue> &
  WithDateAdapterProps &
  DateValidationProps;

export interface SharedPickerProps<TInputValue, TDateValue> {
  isMobileKeyboardViewOpen: boolean;
  toggleMobileKeyboardView: () => void;
  DateInputProps: DateInputProps<TInputValue, TDateValue>;
  date: TDateValue;
  onDateChange: (
    date: TDateValue,
    currentVariant: WrapperVariant,
    isFinish?: boolean | symbol
  ) => void;
}

export interface WithViewsProps<T extends AnyPickerView> {
  /**
   * Array of views to show
   */
  views?: T[];
  /** First view to show */
  openTo?: T;
}
