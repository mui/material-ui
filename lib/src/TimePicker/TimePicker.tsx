import { useUtils } from '../_shared/hooks/useUtils';
import { TimePickerToolbar } from './TimePickerToolbar';
import { BaseClockViewProps } from '../views/Clock/ClockView';
import { timePickerDefaultProps } from '../constants/prop-types';
import { ResponsiveWrapper } from '../wrappers/ResponsiveWrapper';
import { pick12hOr24hFormat } from '../_helpers/text-field-helper';
import { ModalWrapper, InlineWrapper, StaticWrapper } from '../wrappers/Wrapper';
import {
  WithDateInputProps,
  WithViewsProps,
  makePickerWithStateAndWrapper,
} from '../Picker/makePickerWithState';

export interface TimePickerProps
  extends BaseClockViewProps,
    WithViewsProps<'hours' | 'minutes' | 'seconds'>,
    WithDateInputProps {}

function useDefaultProps({
  ampm = false,
  format,
  openTo = 'hours',
  views = ['hours', 'minutes'],
}: TimePickerProps) {
  const utils = useUtils();

  return {
    ...timePickerDefaultProps,
    views,
    openTo,
    refuse: ampm ? /[^\dap]+/gi : /[^\d]+/gi,
    format: pick12hOr24hFormat(format, ampm, {
      '12h': utils.formats.fullTime12h,
      '24h': utils.formats.fullTime24h,
    }),
  };
}

export const TimePicker = makePickerWithStateAndWrapper<TimePickerProps>(ResponsiveWrapper, {
  useDefaultProps,
  DefaultToolbarComponent: TimePickerToolbar,
});

export const DesktopTimePicker = makePickerWithStateAndWrapper<TimePickerProps>(InlineWrapper, {
  useDefaultProps,
  DefaultToolbarComponent: TimePickerToolbar,
});

export const MobileTimePicker = makePickerWithStateAndWrapper<TimePickerProps>(ModalWrapper, {
  useDefaultProps,
  DefaultToolbarComponent: TimePickerToolbar,
});

export const StaticTimePicker = makePickerWithStateAndWrapper<TimePickerProps>(StaticWrapper, {
  useDefaultProps,
  DefaultToolbarComponent: TimePickerToolbar,
});
