import { useUtils } from '../_shared/hooks/useUtils';
import { TimePickerToolbar } from './TimePickerToolbar';
import { PureDateInput } from '../_shared/PureDateInput';
import { KeyboardDateInput } from '../_shared/KeyboardDateInput';
import { timePickerDefaultProps } from '../constants/prop-types';
import { usePickerState } from '../_shared/hooks/usePickerState';
import { pick12hOr24hFormat } from '../_helpers/text-field-helper';
import { useKeyboardPickerState } from '../_shared/hooks/useKeyboardPickerState';
import {
  WithKeyboardInputProps,
  makePickerWithState,
  WithPureInputProps,
} from '../Picker/makePickerWithState';

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
  /** First view to show in timepicker */
  openTo?: 'hours' | 'minutes' | 'seconds';
}

export type TimePickerProps = WithPureInputProps & TimePickerViewsProps;

export type KeyboardTimePickerProps = WithKeyboardInputProps & TimePickerViewsProps;

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

export const TimePicker = makePickerWithState<TimePickerProps>({
  useOptions,
  Input: PureDateInput,
  useState: usePickerState,
  DefaultToolbarComponent: TimePickerToolbar,
});

export const KeyboardTimePicker = makePickerWithState<KeyboardTimePickerProps>({
  useOptions,
  Input: KeyboardDateInput,
  useState: useKeyboardPickerState,
  DefaultToolbarComponent: TimePickerToolbar,
  getCustomProps: props => ({
    refuse: props.ampm ? /[^\dap]+/gi : /[^\d]+/gi,
  }),
});

TimePicker.defaultProps = defaultProps;

KeyboardTimePicker.defaultProps = defaultProps;
