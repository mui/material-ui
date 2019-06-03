import TimePickerToolbar from './TimePickerToolbar';
import { useUtils } from '../_shared/hooks/useUtils';
import { timePickerDefaultProps } from '../constants/prop-types';
import { pick12hOr24hFormat } from '../_helpers/text-field-helper';
import { WrappedPurePickerProps, makePurePicker } from '../Picker/WrappedPurePicker';
import { makeKeyboardPicker, WrappedKeyboardPickerProps } from '../Picker/WrappedKeyboardPicker';

type TimePickerView = 'hours' | 'minutes' | 'seconds';

export interface BaseTimePickerProps {
  /**
   * 12h/24h view for hour selection clock
   * @default true
   */
  ampm?: boolean;
  /**
   * Step over minutes
   * @default 1
   */
  minutesStep?: number;
}

export interface TimePickerViewsProps extends BaseTimePickerProps {
  /** Array of views to show */
  views?: ('hours' | 'minutes' | 'seconds')[];
  /** Open to timepicker */
  openTo?: 'hours' | 'minutes' | 'seconds';
}

export type TimePickerProps = WrappedPurePickerProps & TimePickerViewsProps;

export type KeyboardTimePickerProps = WrappedKeyboardPickerProps & TimePickerViewsProps;

const defaultProps = {
  ...timePickerDefaultProps,
  openTo: 'hours' as TimePickerView,
  views: ['hours', 'minutes'] as TimePickerView[],
};

function useOptions(props: TimePickerProps | KeyboardTimePickerProps) {
  const utils = useUtils();

  return {
    getDefaultFormat: () =>
      pick12hOr24hFormat(props.format, props.ampm, {
        '12h': utils.time12hFormat,
        '24h': utils.time24hFormat,
      }),
  };
}

export const TimePicker = makePurePicker<TimePickerViewsProps>({
  useOptions,
  ToolbarComponent: TimePickerToolbar,
});

export const KeyboardTimePicker = makeKeyboardPicker<TimePickerViewsProps>({
  useOptions,
  ToolbarComponent: TimePickerToolbar,
});

TimePicker.defaultProps = defaultProps;

KeyboardTimePicker.defaultProps = defaultProps;
