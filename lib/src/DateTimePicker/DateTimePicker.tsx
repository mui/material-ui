import { useUtils } from '../_shared/hooks/useUtils';
import { BasePickerProps } from '../typings/BasePicker';
import { BaseDatePickerProps } from '../DatePicker/DatePicker';
import { BaseTimePickerProps } from '../TimePicker/TimePicker';
import { DateTimePickerToolbar } from './DateTimePickerToolbar';
import { pick12hOr24hFormat } from '../_helpers/text-field-helper';
import { dateTimePickerDefaultProps } from '../constants/prop-types';
import { WrappedPurePickerProps, makePurePicker } from '../Picker/WrappedPurePicker';
import { makeKeyboardPicker, WrappedKeyboardPickerProps } from '../Picker/WrappedKeyboardPicker';

export type DateTimePickerView = 'year' | 'date' | 'month' | 'hours' | 'minutes';

export type BaseDateTimePickerProps = BaseTimePickerProps & BaseDatePickerProps;

export interface DateTimePickerViewsProps extends BasePickerProps, BaseDateTimePickerProps {
  /** Array of views to show */
  views?: ('year' | 'date' | 'month' | 'hours' | 'minutes')[];
  /** Open to DatePicker */
  openTo?: 'year' | 'date' | 'month' | 'hours' | 'minutes';
  /** To show tabs */
  hideTabs?: boolean;
  /** Date tab icon */
  dateRangeIcon?: React.ReactNode;
  /** Time tab icon */
  timeIcon?: React.ReactNode;
}

export type DateTimePickerProps = WrappedPurePickerProps & DateTimePickerViewsProps;

export type KeyboardDateTimePickerProps = WrappedKeyboardPickerProps & DateTimePickerViewsProps;

const defaultProps = {
  ...dateTimePickerDefaultProps,
  wider: true,
  openTo: 'date' as DateTimePickerView,
  views: ['year', 'date', 'hours', 'minutes'] as DateTimePickerView[],
};

function useOptions(props: DateTimePickerViewsProps) {
  const utils = useUtils();

  return {
    getDefaultFormat: () =>
      pick12hOr24hFormat(props.format, props.ampm, {
        '12h': utils.dateTime12hFormat,
        '24h': utils.dateTime24hFormat,
      }),
  };
}

export const DateTimePicker = makePurePicker<DateTimePickerProps>({
  useOptions,
  ToolbarComponent: DateTimePickerToolbar,
});

export const KeyboardDateTimePicker = makeKeyboardPicker<KeyboardDateTimePickerProps>({
  useOptions,
  ToolbarComponent: DateTimePickerToolbar,
});

DateTimePicker.defaultProps = defaultProps;

KeyboardDateTimePicker.defaultProps = defaultProps;
