import { CalendarPickerSkeletonClassKey } from '../CalendarPickerSkeleton';
import { ClockClassKey } from '../ClockPicker/Clock';
import { ClockNumberClassKey } from '../ClockPicker/ClockNumber';
import { ClockPointerClassKey } from '../ClockPicker/ClockPointer';
import { DatePickerToolbarClassKey } from '../DatePicker/DatePickerToolbar';
import { DateRangePickerDayClassKey } from '../DateRangePickerDay/DateRangePickerDay';
import { DateTimePickerTabsClassKey } from '../DateTimePicker/DateTimePickerTabs';
import { DateTimePickerToolbarClassKey } from '../DateTimePicker/DateTimePickerToolbar';
import { DayPickerClassKey } from '../DayPicker';
import { LoadingButtonClassKey } from '../LoadingButton';
import { MonthPickerClassKey } from '../MonthPicker';
import { PickerClassKey } from '../internal/pickers/Picker/Picker';
import { PickersArrowSwitcherClassKey } from '../internal/pickers/PickersArrowSwitcher';
import { PickersCalendarClassKey } from '../DayPicker/PickersCalendar';
import { PickersCalendarHeaderClassKey } from '../DayPicker/PickersCalendarHeader';
import { PickersDayClassKey } from '../PickersDay';
import { PickersFadeTransitionGroupClassKey } from '../DayPicker/PickersFadeTransitionGroup';
import { PickersModalDialogClassKey } from '../internal/pickers/PickersModalDialog';
import { PickersMonthClassKey } from '../MonthPicker/PickersMonth';
import { PickersPopperClassKey } from '../internal/pickers/PickersPopper';
import { PickersSlideTransitionClassKey } from '../DayPicker/PickersSlideTransition';
import { PickersToolbarButtonClassKey } from '../internal/pickers/PickersToolbarButton';
import { PickersToolbarClassKey } from '../internal/pickers/PickersToolbar';
import { PickersToolbarTextClassKey } from '../internal/pickers/PickersToolbarText';
import { PickersYearClassKey } from '../YearPicker/PickersYear';
import { TabListClassKey } from '../TabList';
import { TabPanelClassKey } from '../TabPanel';
import { TimelineClassKey } from '../Timeline';
import { TimelineConnectorClassKey } from '../TimelineConnector';
import { TimelineContentClassKey } from '../TimelineContent';
import { TimelineDotClassKey } from '../TimelineDot';
import { TimelineItemClassKey } from '../TimelineItem';
import { TimelineOppositeContentClassKey } from '../TimelineOppositeContent';
import { TimelineSeparatorClassKey } from '../TimelineSeparator';
import { TimePickerToolbarClassKey } from '../TimePicker/TimePickerToolbar';
import { TreeItemClassKey } from '../TreeItem';
import { TreeViewClassKey } from '../TreeView';
import { YearPickerClassKey } from '../YearPicker';

// prettier-ignore
export interface LabComponentNameToClassKey {
  MuiCalendarPickerSkeleton: CalendarPickerSkeletonClassKey;
  MuiClock: ClockClassKey;
  MuiClockNumber: ClockNumberClassKey;
  MuiClockPointer: ClockPointerClassKey;
  MuiDatePickerToolbar: DatePickerToolbarClassKey;
  MuiDateRangePickerDay: DateRangePickerDayClassKey;
  MuiDateTimePickerTabs: DateTimePickerTabsClassKey;
  MuiDateTimePickerToolbar: DateTimePickerToolbarClassKey;
  MuiDayPicker: DayPickerClassKey;
  MuiLoadingButton: LoadingButtonClassKey;
  MuiMonthPicker: MonthPickerClassKey;
  MuiPicker: PickerClassKey;
  MuiPickersArrowSwitcher: PickersArrowSwitcherClassKey;
  MuiPickersCalendar: PickersCalendarClassKey;
  MuiPickersCalendarHeader: PickersCalendarHeaderClassKey;
  MuiPickersDay: PickersDayClassKey;
  MuiPickersFadeTransition: PickersFadeTransitionGroupClassKey;
  MuiPickersModalDialog: PickersModalDialogClassKey;
  MuiPickersMonth: PickersMonthClassKey;
  MuiPickersPopper: PickersPopperClassKey;
  MuiPickersSlideTransition: PickersSlideTransitionClassKey;
  MuiPickersToolbar: PickersToolbarClassKey;
  MuiPickersToolbarButton: PickersToolbarButtonClassKey;
  MuiPickersToolbarText: PickersToolbarTextClassKey;
  MuiPickersYear: PickersYearClassKey;
  MuiTabList: TabListClassKey;
  MuiTabPanel: TabPanelClassKey;
  MuiTimeline: TimelineClassKey;
  MuiTimelineConnector: TimelineConnectorClassKey;
  MuiTimelineContent: TimelineContentClassKey;
  MuiTimelineDot: TimelineDotClassKey;
  MuiTimelineItem: TimelineItemClassKey;
  MuiTimelineOppositeContent: TimelineOppositeContentClassKey;
  MuiTimelineSeparator: TimelineSeparatorClassKey;
  MuiTimePickerToolbar: TimePickerToolbarClassKey;
  MuiTreeItem: TreeItemClassKey;
  MuiTreeView: TreeViewClassKey;
  MuiYearPicker: YearPickerClassKey;
}

declare module '@material-ui/core/styles/overrides' {
  interface ComponentNameToClassKey extends LabComponentNameToClassKey {}
}

// disable automatic export
export {};
