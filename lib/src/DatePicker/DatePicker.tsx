import { useUtils } from '../_shared/hooks/useUtils';
import { DatePickerToolbar } from './DatePickerToolbar';
import { MaterialUiPickersDate } from '../typings/date';
import { getFormatByViews } from '../_helpers/date-utils';
import { OutterCalendarProps } from '../views/Calendar/Calendar';
import { datePickerDefaultProps, ParsableDate } from '../constants/prop-types';
import { WrappedPurePickerProps, makePurePicker } from '../Picker/WrappedPurePicker';
import { makeKeyboardPicker, WrappedKeyboardPickerProps } from '../Picker/WrappedKeyboardPicker';

export type DatePickerView = 'year' | 'date' | 'month';

export interface BaseDatePickerProps extends OutterCalendarProps {
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
  /**
   * To animate scrolling to current year (using scrollIntoView)
   * @default false
   */
  animateYearScrolling?: boolean;
  /** Callback firing on year change @DateIOType */
  onYearChange?: (date: MaterialUiPickersDate) => void;
}

export interface DatePickerViewsProps extends BaseDatePickerProps {
  /**
   * Array of views to show
   * @type {Array<"year" | "date" | "month">}
   */
  views?: DatePickerView[];
  /** Open to DatePicker */
  openTo?: DatePickerView;
}

export type DatePickerProps = WrappedPurePickerProps & DatePickerViewsProps;

export type KeyboardDatePickerProps = WrappedKeyboardPickerProps & DatePickerViewsProps;

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

export const DatePicker = makePurePicker<DatePickerViewsProps>({
  useOptions,
  DefaultToolbarComponent: DatePickerToolbar,
});

export const KeyboardDatePicker = makeKeyboardPicker<DatePickerViewsProps>({
  useOptions,
  DefaultToolbarComponent: DatePickerToolbar,
});

DatePicker.defaultProps = defaultProps;

KeyboardDatePicker.defaultProps = defaultProps;
