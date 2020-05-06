import { DateTimePickerView } from '../DateTimePicker';
import { ParsableDate } from '../constants/prop-types';
import { BasePickerProps } from '../typings/BasePicker';
import { MaterialUiPickersDate } from '../typings/date';
import { ExportedDateInputProps } from '../_shared/PureDateInput';
import { WithDateAdapterProps } from '../_shared/withDateAdapterProp';
import { WrapperVariant, DateInputPropsLike } from '../wrappers/Wrapper';

export type AnyPickerView = DateTimePickerView;

export type AllSharedPickerProps<
  TInputValue = ParsableDate,
  TDateValue = MaterialUiPickersDate
> = BasePickerProps<TInputValue, TDateValue> &
  ExportedDateInputProps<TInputValue, TDateValue> &
  WithDateAdapterProps;

export interface SharedPickerProps<
  TInputValue,
  TDateValue,
  TInputProps = DateInputPropsLike<TInputValue, TDateValue>
> {
  isMobileKeyboardViewOpen: boolean;
  toggleMobileKeyboardView: () => void;
  DateInputProps: TInputProps;
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
