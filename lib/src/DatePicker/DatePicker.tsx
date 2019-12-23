import { useUtils } from '../_shared/hooks/useUtils';
import { MaterialUiPickersDate } from '../typings/date';
import { DatePickerToolbar } from './DatePickerToolbar';
import { PureDateInput } from '../_shared/PureDateInput';
import { getFormatByViews } from '../_helpers/date-utils';
import { KeyboardDateInput } from '../_shared/KeyboardDateInput';
import { usePickerState } from '../_shared/hooks/usePickerState';
import { ExportedCalendarProps } from '../views/Calendar/CalendarView';
import { datePickerDefaultProps, ParsableDate } from '../constants/prop-types';
import { useKeyboardPickerState } from '../_shared/hooks/useKeyboardPickerState';
import {
  WithKeyboardInputProps,
  WithPureInputProps,
  makePickerWithState,
} from '../Picker/makePickerWithState';

export type DatePickerView = 'year' | 'date' | 'month';

export interface BaseDatePickerProps extends ExportedCalendarProps {
  /**
   * Min selectable date
   * @default Date(1900-01-01)
   */
  minDate?: ParsableDate;
  /**
   * Max selectable date
   * @default Date(2100-01-01)
   */
  maxDate?: ParsableDate;

  /**
   * Compare dates by the exact timestamp, instead of start/end of date
   * @default false
   */
  strictCompareDates?: boolean;

  /**
   * Disable past dates
   * @default false
   */
  disablePast?: boolean;
  /**
   * Disable future dates
   * @default false
   */
  disableFuture?: boolean;
  /** Callback firing on year change @DateIOType */
  onYearChange?: (date: MaterialUiPickersDate) => void;
}

export interface DatePickerViewsProps extends BaseDatePickerProps {
  /**
   * Array of views to show
   * @type {Array<"year" | "date" | "month">}
   */
  views?: DatePickerView[];
  /** First view to show in DatePicker */
  openTo?: DatePickerView;
}

export type DatePickerProps = WithPureInputProps & DatePickerViewsProps;

export type KeyboardDatePickerProps = WithKeyboardInputProps & DatePickerViewsProps;

const defaultProps = {
  ...datePickerDefaultProps,
  openTo: 'date' as DatePickerView,
  views: ['year', 'date'] as DatePickerView[],
};

function useOptions(props: DatePickerViewsProps) {
  const utils = useUtils();

  return {
    getDefaultFormat: () => getFormatByViews(props.views!, utils),
  };
}

export const DatePicker = makePickerWithState<DatePickerProps>({
  useOptions,
  Input: PureDateInput,
  useState: usePickerState,
  DefaultToolbarComponent: DatePickerToolbar,
});

export const KeyboardDatePicker = makePickerWithState<KeyboardDatePickerProps>({
  useOptions,
  Input: KeyboardDateInput,
  useState: useKeyboardPickerState,
  DefaultToolbarComponent: DatePickerToolbar,
});

DatePicker.defaultProps = defaultProps;

KeyboardDatePicker.defaultProps = defaultProps;
