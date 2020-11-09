import { useUtils } from '../_shared/hooks/useUtils';
import { DatePickerToolbar } from './DatePickerToolbar';
import { WithViewsProps } from '../Picker/SharedPickerProps';
import { ResponsiveWrapper } from '../wrappers/ResponsiveWrapper';
import { useParsedDate, OverrideParsableDateProps } from '../_shared/hooks/date-helpers-hooks';
import { ExportedCalendarViewProps } from '../views/Calendar/CalendarView';
import { MobileWrapper, DesktopWrapper, StaticWrapper, SomeWrapper } from '../wrappers/Wrapper';
import { makeValidationHook, ValidationProps } from '../_shared/hooks/useValidation';
import { ParsableDate, defaultMinDate, defaultMaxDate } from '../constants/prop-types';
import {
  makePickerWithStateAndWrapper,
  AllPickerProps,
  SharedPickerProps,
} from '../Picker/makePickerWithState';
import { getFormatAndMaskByViews, DateValidationError, validateDate } from '../_helpers/date-utils';

export type DatePickerView = 'year' | 'date' | 'month';

export interface BaseDatePickerProps<TDate>
  extends WithViewsProps<'year' | 'date' | 'month'>,
    ValidationProps<DateValidationError, ParsableDate>,
    OverrideParsableDateProps<TDate, ExportedCalendarViewProps<TDate>, 'minDate' | 'maxDate'> {}

const datePickerConfig = {
  useValidation: makeValidationHook<
    DateValidationError,
    ParsableDate,
    BaseDatePickerProps<unknown>
  >(validateDate),
  DefaultToolbarComponent: DatePickerToolbar,
  useInterceptProps: ({
    openTo = 'date',
    views = ['year', 'date'],
    minDate: __minDate = defaultMinDate,
    maxDate: __maxDate = defaultMaxDate,
    ...other
  }: AllPickerProps<BaseDatePickerProps<unknown>>) => {
    const utils = useUtils();
    const minDate = useParsedDate(__minDate);
    const maxDate = useParsedDate(__maxDate);

    return {
      views,
      openTo,
      minDate,
      maxDate,
      ...getFormatAndMaskByViews(views, utils),
      ...other,
    };
  },
};

type DatePickerComponent<TWrapper extends SomeWrapper> = <TDate>(
  props: BaseDatePickerProps<TDate> & SharedPickerProps<TDate, TWrapper>
) => JSX.Element;

export const DatePicker = makePickerWithStateAndWrapper<BaseDatePickerProps<unknown>>(
  ResponsiveWrapper,
  {
    name: 'MuiDatePicker',
    ...datePickerConfig,
  }
) as DatePickerComponent<typeof ResponsiveWrapper>;

export type DatePickerProps = React.ComponentProps<typeof DatePicker>;

export const MobileDatePicker = makePickerWithStateAndWrapper<BaseDatePickerProps<unknown>>(
  MobileWrapper,
  {
    name: 'MuiMobileDatePicker',
    ...datePickerConfig,
  }
) as DatePickerComponent<typeof MobileWrapper>;

export type MobileDatePickerProps = React.ComponentProps<typeof MobileDatePicker>;

export const DesktopDatePicker = makePickerWithStateAndWrapper<BaseDatePickerProps<unknown>>(
  DesktopWrapper,
  {
    name: 'MuiDesktopDatePicker',
    ...datePickerConfig,
  }
);

export type DesktopDatePickerProps = React.ComponentProps<typeof DesktopDatePicker>;

export const StaticDatePicker = makePickerWithStateAndWrapper<BaseDatePickerProps<unknown>>(
  StaticWrapper,
  {
    name: 'MuiStaticDatePicker',
    ...datePickerConfig,
  }
) as DatePickerComponent<typeof StaticWrapper>;

export type StaticDatePickerProps = React.ComponentProps<typeof StaticDatePicker>;
