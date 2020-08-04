import { useUtils } from '../_shared/hooks/useUtils';
import { DateTimePickerToolbar } from './DateTimePickerToolbar';
import { ExportedClockViewProps } from '../views/Clock/ClockView';
import { ResponsiveWrapper } from '../wrappers/ResponsiveWrapper';
import { pick12hOr24hFormat } from '../_helpers/text-field-helper';
import { useParsedDate, OverrideParsableDateProps } from '../_shared/hooks/date-helpers-hooks';
import { ExportedCalendarViewProps } from '../views/Calendar/CalendarView';
import { makePickerWithStateAndWrapper, SharedPickerProps } from '../Picker/makePickerWithState';
import { DesktopWrapper, MobileWrapper, StaticWrapper, SomeWrapper } from '../wrappers/Wrapper';
import { WithViewsProps, AllSharedPickerProps } from '../Picker/SharedPickerProps';
import { DateAndTimeValidationError, validateDateAndTime } from './date-time-utils';
import { makeValidationHook, ValidationProps } from '../_shared/hooks/useValidation';
import { ParsableDate, defaultMinDate, defaultMaxDate } from '../constants/prop-types';

export type DateTimePickerView = 'year' | 'date' | 'month' | 'hours' | 'minutes' | 'seconds';

type DateTimePickerViewsProps<TDate> = OverrideParsableDateProps<
  TDate,
  ExportedClockViewProps<TDate> & ExportedCalendarViewProps<TDate>,
  'minDate' | 'maxDate' | 'minTime' | 'maxTime'
>;

export interface BaseDateTimePickerProps<TDate>
  extends WithViewsProps<'year' | 'date' | 'month' | 'hours' | 'minutes'>,
    ValidationProps<DateAndTimeValidationError, ParsableDate>,
    DateTimePickerViewsProps<TDate> {
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
  minDateTime?: ParsableDate<TDate>;
  /**
   * Minimal selectable moment of time with binding to date, to set max time in each day use `maxTime`.
   */
  maxDateTime?: ParsableDate<TDate>;
  /**
   * Date format, that is displaying in toolbar.
   */
  toolbarFormat?: string;
}

function useInterceptProps({
  ampm,
  inputFormat,
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
}: BaseDateTimePickerProps<unknown> & AllSharedPickerProps) {
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
    allowSameDateSelection: true,
    minDate: minDateTime || minDate,
    minTime: minDateTime || minTime,
    maxDate: maxDateTime || maxDate,
    maxTime: maxDateTime || maxTime,
    disableIgnoringDatePartForTimeValidation: Boolean(minDateTime || maxDateTime),
    acceptRegex: willUseAmPm ? /[\dap]/gi : /\d/gi,
    mask: '__/__/____ __:__',
    disableMaskedInput: willUseAmPm,
    inputFormat: pick12hOr24hFormat(inputFormat, willUseAmPm, {
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
  BaseDateTimePickerProps<unknown>
>(validateDateAndTime);

const dateTimePickerConfig = {
  useInterceptProps,
  useValidation,
  DefaultToolbarComponent: DateTimePickerToolbar,
};

type DateTimePickerComponent<TWrapper extends SomeWrapper> = <TDate>(
  props: BaseDateTimePickerProps<TDate> & SharedPickerProps<TDate, TWrapper>
) => JSX.Element;

export const DateTimePicker = makePickerWithStateAndWrapper<BaseDateTimePickerProps<unknown>>(
  ResponsiveWrapper,
  {
    name: 'MuiDateTimePicker',
    ...dateTimePickerConfig,
  }
) as DateTimePickerComponent<typeof ResponsiveWrapper>;

export type DateTimePickerProps = React.ComponentProps<typeof DateTimePicker>;

export const DesktopDateTimePicker = makePickerWithStateAndWrapper<
  BaseDateTimePickerProps<unknown>
>(DesktopWrapper, {
  name: 'MuiDesktopDateTimePicker',
  ...dateTimePickerConfig,
}) as DateTimePickerComponent<typeof DesktopWrapper>;

export type DesktopDateTimePickerProps = React.ComponentProps<typeof DesktopDateTimePicker>;

export const MobileDateTimePicker = makePickerWithStateAndWrapper<BaseDateTimePickerProps<unknown>>(
  MobileWrapper,
  {
    name: 'MuiMobileDateTimePicker',
    ...dateTimePickerConfig,
  }
) as DateTimePickerComponent<typeof MobileWrapper>;

export type MobileDateTimePickerProps = React.ComponentProps<typeof MobileDateTimePicker>;

export const StaticDateTimePicker = makePickerWithStateAndWrapper<BaseDateTimePickerProps<unknown>>(
  StaticWrapper,
  {
    name: 'MuiStaticDateTimePicker',
    ...dateTimePickerConfig,
  }
) as DateTimePickerComponent<typeof StaticWrapper>;

export type StaticDateTimePickerProps = React.ComponentProps<typeof StaticDateTimePicker>;
