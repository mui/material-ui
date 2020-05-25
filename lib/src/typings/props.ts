import { PickerProps } from '../Picker/Picker';
import { DateRangeDelimiterProps } from '../DateRangePicker/DateRangeDelimiter';
import {
  ToolbarComponentProps,
  LocalizationProviderProps,
  ClockViewProps,
  CalendarProps,
  ClockProps,
  DayProps,
  DatePickerProps,
  MobileDatePickerProps,
  DesktopDatePickerProps,
  StaticDatePickerProps,
  CalendarViewProps,
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
  MuiPickersDay: DayProps;
  MuiPickersCalendarView: CalendarViewProps;
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
  MuiPickersCalendar: CalendarProps;
  MuiPickersClockView: ClockViewProps;
  MuiPickersClock: ClockProps;
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
}
