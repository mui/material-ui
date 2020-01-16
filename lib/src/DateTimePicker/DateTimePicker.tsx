import { useUtils } from '../_shared/hooks/useUtils';
import { BaseClockViewProps } from '../views/Clock/ClockView';
import { BaseDatePickerProps } from '../DatePicker/DatePicker';
import { DateTimePickerToolbar } from './DateTimePickerToolbar';
import { ResponsiveWrapper } from '../wrappers/ResponsiveWrapper';
import { pick12hOr24hFormat } from '../_helpers/text-field-helper';
import { dateTimePickerDefaultProps } from '../constants/prop-types';
import { InlineWrapper, ModalWrapper, StaticWrapper } from '../wrappers/Wrapper';
import {
  makePickerWithStateAndWrapper,
  WithDateInputProps,
  WithViewsProps,
} from '../Picker/makePickerWithState';

export type DateTimePickerView = 'year' | 'date' | 'month' | 'hours' | 'minutes' | 'seconds';

export type BaseDateTimePickerProps = BaseClockViewProps & BaseDatePickerProps;

export interface DateTimePickerViewsProps extends BaseDateTimePickerProps {
  /** To show tabs */
  hideTabs?: boolean;
  /** Date tab icon */
  dateRangeIcon?: React.ReactNode;
  /** Time tab icon */
  timeIcon?: React.ReactNode;
}

export type DateTimePickerProps = WithDateInputProps &
  DateTimePickerViewsProps &
  WithViewsProps<'year' | 'date' | 'month' | 'hours' | 'minutes'>;

function useDefaultProps({
  ampm = false,
  format,
  orientation = 'portrait',
  openTo = 'date',
  views = ['year', 'date', 'hours', 'minutes'],
}: DateTimePickerProps) {
  const utils = useUtils();

  if (orientation !== 'portrait') {
    throw new Error('We are not supporting custom orientation for DateTimePicker yet :(');
  }

  return {
    ...dateTimePickerDefaultProps,
    openTo,
    views,
    wider: true,
    ampmInClock: true,
    orientation,
    showToolbar: true,
    refuse: ampm ? /[^\dap]+/gi : /[^\d]+/gi,
    format: pick12hOr24hFormat(format, ampm, {
      '12h': utils.formats.keyboardDateTime12h,
      '24h': utils.formats.keyboardDateTime24h,
    }),
  };
}

export const DateTimePicker = makePickerWithStateAndWrapper<DateTimePickerProps>(
  ResponsiveWrapper,
  {
    useDefaultProps,
    DefaultToolbarComponent: DateTimePickerToolbar,
  }
);

export const DesktopDateTimePicker = makePickerWithStateAndWrapper<DateTimePickerProps>(
  InlineWrapper,
  {
    useDefaultProps,
    DefaultToolbarComponent: DateTimePickerToolbar,
  }
);

export const MobileDateTimePicker = makePickerWithStateAndWrapper<DateTimePickerProps>(
  ModalWrapper,
  {
    useDefaultProps,
    DefaultToolbarComponent: DateTimePickerToolbar,
  }
);

export const StaticDateTimePicker = makePickerWithStateAndWrapper<DateTimePickerProps>(
  StaticWrapper,
  {
    useDefaultProps,
    DefaultToolbarComponent: DateTimePickerToolbar,
  }
);
