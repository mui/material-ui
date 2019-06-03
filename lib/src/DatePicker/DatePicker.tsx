import { useUtils } from '../_shared/hooks/useUtils';
import { DatePickerToolbar } from './DatePickerToolbar';
import { MaterialUiPickersDate } from '../typings/date';
import { getFormatByViews } from '../_helpers/date-utils';
import { OutterCalendarProps } from './components/Calendar';
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
   * Compare date isBefore or isAfter without utils endOfDay or startOfDay
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
   * To animate scrolling to current year (with scrollIntoView)
   * @default false
   */
  animateYearScrolling?: boolean;
  /** Callback firing on year change */
  onYearChange?: (date: MaterialUiPickersDate) => void;
}

export interface DatePickerViewsProps extends BaseDatePickerProps {
  /** Array of views to show */
  views?: ('year' | 'date' | 'month')[];
  /** Open to DatePicker */
  openTo?: 'year' | 'date' | 'month';
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
  ToolbarComponent: DatePickerToolbar,
});

export const KeyboardDatePicker = makeKeyboardPicker<DatePickerViewsProps>({
  useOptions,
  ToolbarComponent: DatePickerToolbar,
});

DatePicker.defaultProps = defaultProps;

KeyboardDatePicker.defaultProps = defaultProps;
