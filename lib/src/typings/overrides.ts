import { styles as ModalDialogStyles } from '../_shared/ModalDialog';
import { useStyles as DayStyles } from '../DatePicker/components/Day';
import { styles as ClockStyles } from '../TimePicker/components/Clock';
import { styles as PickerToolbarStyles } from '../_shared/PickerToolbar';
import { styles as ToolbarButtonStyles } from '../_shared/ToolbarButton';
import { styles as CalendarStyles } from '../DatePicker/components/Calendar';
import { useStyles as DTTabsStyles } from '../DateTimePicker/DateTimePickerTabs';
import { useStyles as MuiPickersYearStyles } from '../DatePicker/components/Year';
import { useStyles as DatePickerRootStyles } from '../DatePicker/DatePickerToolbar';
import { useStyles as MuiPickersMonthStyles } from '../DatePicker/components/Month';
import { styles as ClockPointerStyles } from '../TimePicker/components/ClockPointer';
import { StyleRules, StyleRulesCallback } from '@material-ui/core/styles/withStyles';
import { useStyles as ClockNumberStyles } from '../TimePicker/components/ClockNumber';
import { useStyles as DTHeaderStyles } from '../DateTimePicker/DateTimePickerToolbar';
import { useStyles as TimePickerToolbarStyles } from '../TimePicker/TimePickerToolbar';
import { useStyles as CalendarHeaderStyles } from '../DatePicker/components/CalendarHeader';
import { useStyles as SlideTransitionStyles } from '../DatePicker/components/SlideTransition';
import { useStyles as MuiPickerDTToolbarStyles } from '../DateTimePicker/DateTimePickerToolbar';
import { useStyles as MuiPickersYearSelectionStyles } from '../DatePicker/components/YearSelection';
import { useStyles as MuiPickersMonthSelectionStyles } from '../DatePicker/components/MonthSelection';

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
  MuiPickersTimePickerToolbar?: Classes<typeof TimePickerToolbarStyles>;
  MuiPickersClock?: Classes<typeof ClockStyles>;
  MuiPickersClockNumber?: Classes<typeof ClockNumberStyles>;
  MuiPickersClockPointer?: Classes<typeof ClockPointerStyles>;
  MuiPickersModal?: Classes<typeof ModalDialogStyles>;
  MuiPickersToolbar?: Classes<typeof PickerToolbarStyles>;
  MuiPickersToolbarButton?: Classes<typeof ToolbarButtonStyles>;
  MuiPickersDatePickerRoot?: Classes<typeof DatePickerRootStyles>;
  MuiPickerDTToolbar?: Classes<typeof MuiPickerDTToolbarStyles>;
}
