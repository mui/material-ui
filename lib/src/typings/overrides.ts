import { styles as ModalDialogStyles } from '../_shared/ModalDialog';
import { useStyles as DayStyles } from '../DatePicker/components/Day';
import { styles as ClockStyles } from '../TimePicker/components/Clock';
import { styles as PickerToolbarStyles } from '../_shared/PickerToolbar';
import { styles as ToolbarButtonStyles } from '../_shared/ToolbarButton';
import { useStyles as TimePickerStyles } from '../TimePicker/TimePickerRoot';
import { styles as CalendarStyles } from '../DatePicker/components/Calendar';
import { useStyles as DatePickerRootStyles } from '../DatePicker/DatePickerRoot';
import { useStyles as MuiPickersYearStyles } from '../DatePicker/components/Year';
import { styles as ClockNumberStyles } from '../TimePicker/components/ClockNumber';
import { useStyles as MuiPickersMonthStyles } from '../DatePicker/components/Month';
import { StyleRules, StyleRulesCallback } from '@material-ui/core/styles/withStyles';
import { styles as ClockPointerStyles } from '../TimePicker/components/ClockPointer';
import { styles as DTTabsStyles } from '../DateTimePicker/components/DateTimePickerTabs';
import { useStyles as CalendarHeaderStyles } from '../DatePicker/components/CalendarHeader';
import { useStyles as SlideTransitionStyles } from '../DatePicker/components/SlideTransition';
import { useStyles as DTHeaderStyles } from '../DateTimePicker/components/DateTimePickerHeader';
import { styles as MuiPickersMonthSelectionStyles } from '../DatePicker/components/MonthSelection';
import { useStyles as MuiPickersYearSelectionStyles } from '../DatePicker/components/YearSelection';

type Classes<T> = Partial<
  StyleRules<
    T extends string
      ? T
      : T extends StyleRulesCallback<infer K>
      ? K
      : T extends StyleRules<infer D>
      ? D
      : never
  >
>;

export interface MuiPickersOverrides {
  MuiPickersDay?: Classes<typeof DayStyles>;
  MuiPickerDTHeader?: Classes<typeof DTHeaderStyles>;
  MuiPickerDTTabs?: Classes<typeof DTTabsStyles>;
  MuiPickersCalendar?: Classes<typeof CalendarStyles>;
  MuiPickersCalendarHeader?: Classes<typeof CalendarHeaderStyles>;
  MuiPickersSlideTransition?: Classes<typeof SlideTransitionStyles>;
  MuiPickersYearSelectionStyles?: Classes<typeof MuiPickersYearSelectionStyles>;
  MuiPickersYear?: Classes<typeof MuiPickersYearStyles>;
  MuiPickersMonthSelection?: Classes<typeof MuiPickersMonthSelectionStyles>;
  MuiPickersMonth?: Classes<typeof MuiPickersMonthStyles>;
  MuiPickersTimePicker?: Classes<typeof TimePickerStyles>;
  MuiPickersClock?: Classes<typeof ClockStyles>;
  MuiPickersClockNumber?: Classes<typeof ClockNumberStyles>;
  MuiPickersClockPointer?: Classes<typeof ClockPointerStyles>;
  MuiPickersModal?: Classes<typeof ModalDialogStyles>;
  MuiPickersToolbar?: Classes<typeof PickerToolbarStyles>;
  MuiPickersToolbarButton?: Classes<typeof ToolbarButtonStyles>;
  MuiPickersDatePickerRoot?: Classes<typeof DatePickerRootStyles>;
}
