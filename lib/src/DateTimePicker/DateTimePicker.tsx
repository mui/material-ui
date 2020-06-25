import { useUtils } from '../_shared/hooks/useUtils';
import { DateTimePickerToolbar } from './DateTimePickerToolbar';
import { ExportedClockViewProps } from '../views/Clock/ClockView';
import { ResponsiveWrapper } from '../wrappers/ResponsiveWrapper';
import { pick12hOr24hFormat } from '../_helpers/text-field-helper';
import { useParsedDate } from '../_shared/hooks/date-helpers-hooks';
import { ExportedCalendarViewProps } from '../views/Calendar/CalendarView';
import { makePickerWithStateAndWrapper } from '../Picker/makePickerWithState';
import { DesktopWrapper, MobileWrapper, StaticWrapper } from '../wrappers/Wrapper';
import { WithViewsProps, AllSharedPickerProps } from '../Picker/SharedPickerProps';
import { DateAndTimeValidationError, validateDateAndTime } from './date-time-utils';
import { makeValidationHook, ValidationProps } from '../_shared/hooks/useValidation';
import { ParsableDate, defaultMinDate, defaultMaxDate } from '../constants/prop-types';

export type DateTimePickerView = 'year' | 'date' | 'month' | 'hours' | 'minutes' | 'seconds';

export interface BaseDateTimePickerProps
  extends WithViewsProps<'year' | 'date' | 'month' | 'hours' | 'minutes'>,
    ValidationProps<DateAndTimeValidationError, ParsableDate>,
    ExportedClockViewProps,
    ExportedCalendarViewProps {
  /**
   * To show tabs.
   */
  hideTabs?: boolean;
  /**
   * Date tab icon.
   */
  dateRangeIcon?: React.ReactNode;
  /**
   * Time tab icon.
   */
  timeIcon?: React.ReactNode;
  /**
   * Minimal selectable moment of time with binding to date, to set min time in each day use `minTime`.
   */
  minDateTime?: ParsableDate;
  /**
   * Minimal selectable moment of time with binding to date, to set max time in each day use `maxTime`.
   */
  maxDateTime?: ParsableDate;
  /**
   * Date format, that is displaying in toolbar.
   */
  toolbarFormat?: string;
}

function useInterceptProps({
  ampm,
  inputFormat,
  mask,
  maxDate: __maxDate = defaultMaxDate,
  maxDateTime: __maxDateTime,
  maxTime: __maxTime,
  minDate: __minDate = defaultMinDate,
  minDateTime: __minDateTime,
  minTime: __minTime,
  openTo = 'date',
  orientation = 'portrait',
  views = ['year', 'date', 'hours', 'minutes'],
  ...other
}: BaseDateTimePickerProps & AllSharedPickerProps) {
  const utils = useUtils();
  const minTime = useParsedDate(__minTime);
  const maxTime = useParsedDate(__maxTime);
  const minDate = useParsedDate(__minDate);
  const maxDate = useParsedDate(__maxDate);
  const minDateTime = useParsedDate(__minDateTime);
  const maxDateTime = useParsedDate(__maxDateTime);
  const willUseAmPm = ampm ?? utils.is12HourCycleInCurrentLocale();

  if (orientation !== 'portrait') {
    throw new Error('We are not supporting custom orientation for DateTimePicker yet :(');
  }

  return {
    openTo,
    views,
    ampm: willUseAmPm,
    ampmInClock: true,
    orientation,
    showToolbar: true,
    showTabs: true,
    minDate: minDateTime || minDate,
    minTime: minDateTime || minTime,
    maxDate: maxDateTime || maxDate,
    maxTime: maxDateTime || maxTime,
    disableIgnoringDatePartForTimeValidation: Boolean(minDateTime || maxDateTime),
    acceptRegex: willUseAmPm ? /[\dap]/gi : /\d/gi,
    mask: mask || (willUseAmPm ? '__/__/____ __:__ _M' : '__/__/____ __:__'),
    inputFormat: pick12hOr24hFormat(inputFormat, ampm, {
      localized: utils.formats.keyboardDateTime,
      '12h': utils.formats.keyboardDateTime12h,
      '24h': utils.formats.keyboardDateTime24h,
    }),
    ...other,
  };
}

const useValidation = makeValidationHook<
  DateAndTimeValidationError,
  ParsableDate,
  BaseDateTimePickerProps
>(validateDateAndTime);

const dateTimePickerConfig = {
  useInterceptProps,
  useValidation,
  DefaultToolbarComponent: DateTimePickerToolbar,
};

export const DateTimePicker = makePickerWithStateAndWrapper<BaseDateTimePickerProps>(
  ResponsiveWrapper,
  {
    name: 'MuiPickersDateTimePicker',
    ...dateTimePickerConfig,
  }
);

export type DateTimePickerProps = React.ComponentProps<typeof DateTimePicker>;

export const DesktopDateTimePicker = makePickerWithStateAndWrapper<BaseDateTimePickerProps>(
  DesktopWrapper,
  {
    name: 'MuiPickersDesktopDateTimePicker',
    ...dateTimePickerConfig,
  }
);

export type DesktopDateTimePickerProps = React.ComponentProps<typeof DesktopDateTimePicker>;

export const MobileDateTimePicker = makePickerWithStateAndWrapper<BaseDateTimePickerProps>(
  MobileWrapper,
  {
    name: 'MuiPickersMobileDateTimePicker',
    ...dateTimePickerConfig,
  }
);

export type MobileDateTimePickerProps = React.ComponentProps<typeof MobileDateTimePicker>;

export const StaticDateTimePicker = makePickerWithStateAndWrapper<BaseDateTimePickerProps>(
  StaticWrapper,
  {
    name: 'MuiPickersStaticDateTimePicker',
    ...dateTimePickerConfig,
  }
);

export type StaticDateTimePickerProps = React.ComponentProps<typeof StaticDateTimePicker>;
