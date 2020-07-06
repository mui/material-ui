import { DateTimePickerView } from '../DateTimePicker';
import { ParsableDate } from '../constants/prop-types';
import { BasePickerProps } from '../typings/BasePicker';
import { MaterialUiPickersDate } from '../typings/date';
import { PickerOnChangeFn } from '../_shared/hooks/useViews';
import { ExportedDateInputProps } from '../_shared/PureDateInput';
import { ExportedClockViewProps } from '../views/Clock/ClockView';
import { WithDateAdapterProps } from '../_shared/withDateAdapterProp';
import { PickerSelectionState } from '../_shared/hooks/usePickerState';
import { DateInputPropsLike, WrapperVariant } from '../wrappers/Wrapper';
import { ExportedCalendarViewProps } from '../views/Calendar/CalendarView';

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
    currentWrapperVariant: WrapperVariant,
    isFinish?: PickerSelectionState
  ) => void;
}

export interface WithViewsProps<T extends AnyPickerView> {
  /**
   * Array of views to show.
   */
  views?: T[];
  /**
   * First view to show.
   */
  openTo?: T;
}

export type CalendarAndClockProps = ExportedCalendarViewProps & ExportedClockViewProps;

export type ToolbarComponentProps<
  TDate = MaterialUiPickersDate,
  TView extends AnyPickerView = AnyPickerView
> = CalendarAndClockProps & {
  ampmInClock?: boolean;
  date: TDate;
  dateRangeIcon?: React.ReactNode;
  getMobileKeyboardInputViewButtonText?: () => string;
  // TODO move out, cause it is DateTimePickerOnly
  hideTabs?: boolean;
  isLandscape: boolean;
  isMobileKeyboardViewOpen: boolean;
  onChange: PickerOnChangeFn;
  openView: TView;
  setOpenView: (view: TView) => void;
  timeIcon?: React.ReactNode;
  toggleMobileKeyboardView: () => void;
  toolbarFormat?: string;
  toolbarPlaceholder?: React.ReactNode;
  toolbarTitle?: React.ReactNode;
  views: TView[];
};
