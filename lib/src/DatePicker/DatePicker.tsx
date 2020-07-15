import { useUtils } from '../_shared/hooks/useUtils';
import { DatePickerToolbar } from './DatePickerToolbar';
import { WithViewsProps } from '../Picker/SharedPickerProps';
import { ResponsiveWrapper } from '../wrappers/ResponsiveWrapper';
import { useParsedDate } from '../_shared/hooks/date-helpers-hooks';
import { ExportedCalendarViewProps } from '../views/Calendar/CalendarView';
import { MobileWrapper, DesktopWrapper, StaticWrapper } from '../wrappers/Wrapper';
import { makeValidationHook, ValidationProps } from '../_shared/hooks/useValidation';
import { ParsableDate, defaultMinDate, defaultMaxDate } from '../constants/prop-types';
import { makePickerWithStateAndWrapper, AllPickerProps } from '../Picker/makePickerWithState';
import { getFormatAndMaskByViews, validateDate, DateValidationError } from '../_helpers/date-utils';

export type DatePickerView = 'year' | 'date' | 'month';

export interface BaseDatePickerProps
  extends WithViewsProps<'year' | 'date' | 'month'>,
    ValidationProps<DateValidationError, ParsableDate>,
    ExportedCalendarViewProps {}

const datePickerConfig = {
  useValidation: makeValidationHook<DateValidationError, ParsableDate, BaseDatePickerProps>(
    validateDate
  ),
  DefaultToolbarComponent: DatePickerToolbar,
  useInterceptProps: ({
    openTo = 'date',
    views = ['year', 'date'],
    minDate: __minDate = defaultMinDate,
    maxDate: __maxDate = defaultMaxDate,
    ...other
  }: AllPickerProps<BaseDatePickerProps>) => {
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

export const DatePicker = makePickerWithStateAndWrapper<BaseDatePickerProps>(ResponsiveWrapper, {
  name: 'MuiDatePicker',
  ...datePickerConfig,
});

export type DatePickerProps = React.ComponentProps<typeof DatePicker>;

export const MobileDatePicker = makePickerWithStateAndWrapper<BaseDatePickerProps>(MobileWrapper, {
  name: 'MuiMobileDatePicker',
  ...datePickerConfig,
});

export type MobileDatePickerProps = React.ComponentProps<typeof MobileDatePicker>;

export const DesktopDatePicker = makePickerWithStateAndWrapper<BaseDatePickerProps>(
  DesktopWrapper,
  {
    name: 'MuiDesktopDatePicker',
    ...datePickerConfig,
  }
);

export type DesktopDatePickerProps = React.ComponentProps<typeof DesktopDatePicker>;

export const StaticDatePicker = makePickerWithStateAndWrapper<BaseDatePickerProps>(StaticWrapper, {
  name: 'MuiStaticDatePicker',
  ...datePickerConfig,
});

export type StaticDatePickerProps = React.ComponentProps<typeof StaticDatePicker>;
