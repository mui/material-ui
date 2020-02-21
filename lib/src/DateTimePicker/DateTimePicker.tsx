import { useUtils } from '../_shared/hooks/useUtils';
import { BaseDatePickerProps } from '../DatePicker/DatePicker';
import { DateTimePickerToolbar } from './DateTimePickerToolbar';
import { ExportedClockViewProps } from '../views/Clock/ClockView';
import { ResponsiveWrapper } from '../wrappers/ResponsiveWrapper';
import { pick12hOr24hFormat } from '../_helpers/text-field-helper';
import { InlineWrapper, ModalWrapper, StaticWrapper } from '../wrappers/Wrapper';
import { dateTimePickerDefaultProps, ParsableDate } from '../constants/prop-types';
import {
  makePickerWithStateAndWrapper,
  WithDateInputProps,
  WithViewsProps,
} from '../Picker/makePickerWithState';

export type DateTimePickerView = 'year' | 'date' | 'month' | 'hours' | 'minutes' | 'seconds';

export type BaseDateTimePickerProps = ExportedClockViewProps & BaseDatePickerProps;

export interface DateTimePickerViewsProps extends BaseDateTimePickerProps {
  /** To show tabs */
  hideTabs?: boolean;
  /** Date tab icon */
  dateRangeIcon?: React.ReactNode;
  /** Time tab icon */
  timeIcon?: React.ReactNode;
  /** `minDate` + `minTime` combined */
  minDateTime?: ParsableDate;
  /** `maxDate` + `maxTime` combined */
  maxDateTime?: ParsableDate;
}

export type DateTimePickerProps = WithDateInputProps &
  DateTimePickerViewsProps &
  WithViewsProps<'year' | 'date' | 'month' | 'hours' | 'minutes'>;

function useDefaultProps({
  ampm,
  format,
  mask,
  maxDateTime,
  minDateTime,
  orientation = 'portrait',
  openTo = 'date',
  views = ['year', 'date', 'hours', 'minutes'],
}: DateTimePickerProps) {
  const utils = useUtils();
  const willUseAmPm = ampm ?? utils.is12HourCycleInCurrentLocale();

  if (orientation !== 'portrait') {
    throw new Error('We are not supporting custom orientation for DateTimePicker yet :(');
  }

  return {
    ...dateTimePickerDefaultProps,
    openTo,
    views,
    ampm: willUseAmPm,
    wider: true,
    ampmInClock: true,
    orientation,
    showToolbar: true,
    minDate: minDateTime,
    minTime: minDateTime,
    maxDate: maxDateTime,
    maxTime: maxDateTime,
    disableTimeValidationIgnoreDatePart: Boolean(minDateTime || maxDateTime),
    acceptRegex: willUseAmPm ? /[\dap]/gi : /\d/gi,
    mask: mask || willUseAmPm ? '__/__/____ __:__ _M' : '__/__/____ __:__',
    format: pick12hOr24hFormat(format, ampm, {
      localized: utils.formats.keyboardDateTime,
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
