import { AvatarGroupProps } from '../AvatarGroup';
import { CalendarPickerProps } from '../CalendarPicker';
import { CalendarPickerSkeletonProps } from '../CalendarPickerSkeleton';
import { ClockPickerProps } from '../ClockPicker';
import { DatePickerProps } from '../DatePicker';
import { DateRangePickerDayProps } from '../DateRangePickerDay/DateRangePickerDay';
import { DateTimePickerProps } from '../DateTimePicker';
import { DesktopDateTimePickerProps } from '../DesktopDateTimePicker';
import { DesktopTimePickerProps } from '../DesktopTimePicker';
import { LoadingButtonProps } from '../LoadingButton';
import { MobileDatePickerProps } from '../MobileDatePicker';
import { MobileDateTimePickerProps } from '../MobileDateTimePicker';
import { MobileTimePickerProps } from '../MobileTimePicker';
import { MonthPickerProps } from '../MonthPicker/MonthPicker';
import { PickersDayProps } from '../PickersDay';
import { StaticDatePickerProps } from '../StaticDatePicker';
import { StaticDateTimePickerProps } from '../StaticDateTimePicker';
import { StaticTimePickerProps } from '../StaticTimePicker';
import { TabListProps } from '../TabList';
import { TabPanelProps } from '../TabPanel';
import { TimelineConnectorProps } from '../TimelineConnector';
import { TimelineContentProps } from '../TimelineContent';
import { TimelineDotProps } from '../TimelineDot';
import { TimelineItemProps } from '../TimelineItem';
import { TimelineOppositeContentProps } from '../TimelineOppositeContent';
import { TimelineProps } from '../Timeline';
import { TimelineSeparatorProps } from '../TimelineSeparator';
import { TimePickerProps } from '../TimePicker';
import { TreeItemProps } from '../TreeItem';
import { TreeViewProps } from '../TreeView';
import { YearPickerProps } from '../YearPicker';

export interface LabComponentsPropsList {
  MuiAvatarGroup: AvatarGroupProps;
  MuiCalendarPicker: CalendarPickerProps<unknown>;
  MuiCalendarPickerSkeleton: CalendarPickerSkeletonProps;
  MuiClockPicker: ClockPickerProps<unknown>;
  MuiDatePicker: DatePickerProps;
  MuiDateRangePickerDay: DateRangePickerDayProps;
  MuiDateTimePicker: DateTimePickerProps;
  MuiDesktopDateTimePicker: DesktopDateTimePickerProps;
  MuiDesktopTimePicker: DesktopTimePickerProps;
  MuiLoadingButton: LoadingButtonProps;
  MuiMobileDatePicker: MobileDatePickerProps;
  MuiMobileDateTimePicker: MobileDateTimePickerProps;
  MuiMobileTimePicker: MobileTimePickerProps;
  MuiMonthPicker: MonthPickerProps<unknown>;
  MuiPickersDay: PickersDayProps<unknown>;
  MuiStaticDatePicker: StaticDatePickerProps;
  MuiStaticDateTimePicker: StaticDateTimePickerProps;
  MuiStaticTimePicker: StaticTimePickerProps;
  MuiTabList: TabListProps;
  MuiTabPanel: TabPanelProps;
  MuiTimeline: TimelineProps;
  MuiTimelineConnector: TimelineConnectorProps;
  MuiTimelineContent: TimelineContentProps;
  MuiTimelineDot: TimelineDotProps;
  MuiTimelineItem: TimelineItemProps;
  MuiTimelineOppositeContent: TimelineOppositeContentProps;
  MuiTimelineSeparator: TimelineSeparatorProps;
  MuiTimePicker: TimePickerProps;
  MuiTreeItem: TreeItemProps;
  MuiTreeView: TreeViewProps;
  MuiYearPicker: YearPickerProps<unknown>;
}

declare module '@mui/material/styles' {
  interface ComponentsPropsList extends LabComponentsPropsList {}
}

// disable automatic export
export {};
