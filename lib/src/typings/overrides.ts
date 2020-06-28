import { useStyles as DayStyles } from '../views/Calendar/Day';
import { useStyles as ClockStyles } from '../views/Clock/Clock';
import { useStyles as MuiBasePickerStyles } from '../Picker/Picker';
import { useStyles as CalendarStyles } from '../views/Calendar/Calendar';
import { useStyles as MuiPickersYearStyles } from '../views/Calendar/Year';
import { styles as ClockPointerStyles } from '../views/Clock/ClockPointer';
import { useStyles as ToolbarButtonStyles } from '../_shared/ToolbarButton';
import { useStyles as PickerToolbarStyles } from '../_shared/PickerToolbar';
import { useStyles as ClockNumberStyles } from '../views/Clock/ClockNumber';
import { useStyles as MuiPickersMonthStyles } from '../views/Calendar/Month';
import { useStyles as CalendarViewStyles } from '../views/Calendar/CalendarView';
import { useStyles as DTTabsStyles } from '../DateTimePicker/DateTimePickerTabs';
import { useStyles as MuiPickersToolbarTextStyles } from '../_shared/ToolbarText';
import { useStyles as DatePickerRootStyles } from '../DatePicker/DatePickerToolbar';
import { useStyles as CalendarHeaderStyles } from '../views/Calendar/CalendarHeader';
import { StyleRules, StyleRulesCallback } from '@material-ui/core/styles/withStyles';
import { useStyles as DTHeaderStyles } from '../DateTimePicker/DateTimePickerToolbar';
import { useStyles as TimePickerToolbarStyles } from '../TimePicker/TimePickerToolbar';
import { useStyles as SlideTransitionStyles } from '../views/Calendar/SlideTransition';
import { useStyles as MuiPickersYearSelectionStyles } from '../views/Calendar/YearSelection';
import { useStyles as MuiPickersMonthSelectionStyles } from '../views/Calendar/MonthSelection';
import { useStyles as MuiPickerDTToolbarStyles } from '../DateTimePicker/DateTimePickerToolbar';

type StylesHook<C extends string> = (props?: any) => Record<C, string>;

type Classes<T> = T extends string
  ? T
  : T extends StylesHook<infer C>
  ? C
  : T extends StyleRulesCallback<any, any, infer K>
  ? K
  : T extends StyleRules<infer D>
  ? D
  : never;

export interface MuiPickersComponentsToClassName {
  MuiPickersDay: Classes<typeof DayStyles>;
  MuiPickerDTHeader: Classes<typeof DTHeaderStyles>;
  MuiPickerDTTabs: Classes<typeof DTTabsStyles>;
  MuiPickersCalendar: Classes<typeof CalendarStyles>;
  MuiPickersCalendarView: Classes<typeof CalendarViewStyles>;
  MuiPickersCalendarHeader: Classes<typeof CalendarHeaderStyles>;
  MuiPickersSlideTransition: Classes<typeof SlideTransitionStyles>;
  MuiPickersYearSelection: Classes<typeof MuiPickersYearSelectionStyles>;
  MuiPickersYear: Classes<typeof MuiPickersYearStyles>;
  MuiPickersMonthSelection: Classes<typeof MuiPickersMonthSelectionStyles>;
  MuiPickersMonth: Classes<typeof MuiPickersMonthStyles>;
  MuiPickersTimePickerToolbar: Classes<typeof TimePickerToolbarStyles>;
  MuiPickersClock: Classes<typeof ClockStyles>;
  MuiPickersClockNumber: Classes<typeof ClockNumberStyles>;
  MuiPickersClockPointer: Classes<typeof ClockPointerStyles>;
  MuiPickersToolbar: Classes<typeof PickerToolbarStyles>;
  MuiPickersToolbarButton: Classes<typeof ToolbarButtonStyles>;
  MuiPickersToolbarText: Classes<typeof MuiPickersToolbarTextStyles>;
  MuiPickersDatePickerRoot: Classes<typeof DatePickerRootStyles>;
  MuiPickerDTToolbar: Classes<typeof MuiPickerDTToolbarStyles>;
  MuiBasePickerStyles: Classes<typeof MuiBasePickerStyles>;
  // consider using inline import type notation
  MuiPickersDesktopDateRangeCalendar: Classes<
    typeof import('../DateRangePicker/DateRangePickerViewDesktop').useStyles
  >;
  MuiPickersArrowSwitcher: Classes<typeof import('../_shared/ArrowSwitcher').useStyles>;
  MuiPickersDateRangePickerInput: Classes<
    typeof import('../DateRangePicker/DateRangePickerInput').useStyles
  >;
  MuiPickersModalDialog: Classes<typeof import('../_shared/PickerModalDialog').useStyles>;
  MuiPickersCalendarSkeleton: Classes<typeof import('../CalendarSkeleton').useStyles>;
  MuiPickersPopper: Classes<typeof import('../_shared/PickerPopper').useStyles>;
}
