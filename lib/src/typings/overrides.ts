import { styles as ModalDialogStyles } from '../_shared/ModalDialog';
import { useStyles as DayStyles } from '../DatePicker/components/Day';
import { styles as ClockStyles } from '../TimePicker/components/Clock';
import { styles as PickerToolbarStyles } from '../_shared/PickerToolbar';
import { styles as ToolbarButtonStyles } from '../_shared/ToolbarButton';
import { styles as TimePickerStyles } from '../TimePicker/TimePickerRoot';
import { styles as CalendarStyles } from '../DatePicker/components/Calendar';
import { styles as MuiPickersYearStyles } from '../DatePicker/components/Year';
import { styles as ClockNumberStyles } from '../TimePicker/components/ClockNumber';
import { useStyles as MuiPickersMonthStyles } from '../DatePicker/components/Month';
import { StyleRules, StyleRulesCallback } from '@material-ui/core/styles/withStyles';
import { styles as ClockPointerStyles } from '../TimePicker/components/ClockPointer';
import { styles as DTTabsStyles } from '../DateTimePicker/components/DateTimePickerTabs';
import { styles as CalendarHeaderStyles } from '../DatePicker/components/CalendarHeader';
import { styles as DTHeaderStyles } from '../DateTimePicker/components/DateTimePickerHeader';
import { useStyles as SlideTransitionStyles } from '../DatePicker/components/SlideTransition';
import { styles as MuiPickersYearSelectionStyles } from '../DatePicker/components/YearSelection';
import { styles as MuiPickersMonthSelectionStyles } from '../DatePicker/components/MonthSelection';

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
}
