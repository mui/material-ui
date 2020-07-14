import { PickerProps } from '../Picker/Picker';
import { CalendarSkeletonProps } from '../CalendarSkeleton';
import { DateRangeDelimiterProps } from '../DateRangePicker/DateRangeDelimiter';
import {
  ToolbarComponentProps,
  LocalizationProviderProps,
  PickersClockViewProps,
  PickersCalendarProps,
  PickersClockProps,
  PickersDayProps,
  DatePickerProps,
  MobileDatePickerProps,
  DesktopDatePickerProps,
  StaticDatePickerProps,
  PickersCalendarViewProps,
  TimePickerProps,
  MobileTimePickerProps,
  DesktopTimePickerProps,
  StaticTimePickerProps,
  DateTimePickerProps,
  MobileDateTimePickerProps,
  DesktopDateTimePickerProps,
  StaticDateTimePickerProps,
  DateRangePickerProps,
  MobileDateRangePickerProps,
  DesktopDateRangePickerProps,
  StaticDateRangePickerProps,
} from '..';

export interface MuiPickersComponentsPropsList {
  MuiPickersDay: PickersDayProps;
  MuiPickersCalendarView: PickersCalendarViewProps;
  MuiPickersDatePicker: DatePickerProps;
  MuiPickersMobileDatePicker: MobileDatePickerProps;
  MuiPickersDesktopDatePicker: DesktopDatePickerProps;
  MuiPickersStaticDatePicker: StaticDatePickerProps;
  MuiPickersTimePicker: TimePickerProps;
  MuiPickersMobileTimePicker: MobileTimePickerProps;
  MuiPickersDesktopTimePicker: DesktopTimePickerProps;
  MuiPickersStaticTimePicker: StaticTimePickerProps;
  MuiPickersDateTimePicker: DateTimePickerProps;
  MuiPickersMobileDateTimePicker: MobileDateTimePickerProps;
  MuiPickersDesktopDateTimePicker: DesktopDateTimePickerProps;
  MuiPickersStaticDateTimePicker: StaticDateTimePickerProps;
  MuiPickersCalendar: PickersCalendarProps;
  MuiPickersClockView: PickersClockViewProps;
  MuiPickersClock: PickersClockProps;
  MuiPickersBasePicker: PickerProps<any, any, any>;
  MuiPickersLocalizationProvider: LocalizationProviderProps;
  MuiPickersTimePickerToolbar: ToolbarComponentProps;
  MuiPickersDatePickerToolbar: ToolbarComponentProps;
  MuiPickersDateTimePickerToolbar: ToolbarComponentProps;
  MuiPickersDateRangePickerToolbarProps: ToolbarComponentProps;
  MuiPickersDateRangePicker: DateRangePickerProps;
  MuiPickersDesktopDateRangePicker: DesktopDateRangePickerProps;
  MuiPickersMobileDateRangePicker: MobileDateRangePickerProps;
  MuiPickersStaticDateRangePicker: StaticDateRangePickerProps;
  MuiPickersDateRangeDelimiter: DateRangeDelimiterProps;
  MuiPickersCalendarSkeleton: CalendarSkeletonProps;
}
