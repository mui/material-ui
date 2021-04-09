import { ComponentsProps, ComponentsOverrides, ComponentsVariants } from '@material-ui/core';

export interface LabComponents {
  MuiClockPicker?: {
    defaultProps?: ComponentsProps['MuiClockPicker'];
  };
  MuiDatePicker?: {
    defaultProps?: ComponentsProps['MuiDatePicker'];
  };
  MuiDateTimePicker?: {
    defaultProps?: ComponentsProps['MuiDateTimePicker'];
  };
  MuiDesktopDateTimePicker?: {
    defaultProps?: ComponentsProps['MuiDesktopDateTimePicker'];
  };
  MuiDesktopTimePicker?: {
    defaultProps?: ComponentsProps['MuiDesktopTimePicker'];
  };
  MuiMobileDatePicker?: {
    defaultProps?: ComponentsProps['MuiMobileDatePicker'];
  };
  MuiMobileDateTimePicker?: {
    defaultProps?: ComponentsProps['MuiMobileDateTimePicker'];
  };
  MuiMobileTimePicker?: {
    defaultProps?: ComponentsProps['MuiMobileTimePicker'];
  };
  MuiTabList?: {
    defaultProps?: ComponentsProps['MuiTabList'];
    styleOverrides?: ComponentsOverrides['MuiTabList'];
  };
  MuiTabPanel?: {
    defaultProps?: ComponentsProps['MuiTabPanel'];
    styleOverrides?: ComponentsOverrides['MuiTabPanel'];
  };
  MuiTimeline?: {
    defaultProps?: ComponentsProps['MuiTimeline'];
    styleOverrides?: ComponentsOverrides['MuiTimeline'];
  };
  MuiTimelineConnector?: {
    defaultProps?: ComponentsProps['MuiTimelineConnector'];
    styleOverrides?: ComponentsOverrides['MuiTimelineConnector'];
  };
  MuiTimelineContent?: {
    defaultProps?: ComponentsProps['MuiTimelineContent'];
    styleOverrides?: ComponentsOverrides['MuiTimelineContent'];
  };
  MuiTimelineDot?: {
    defaultProps?: ComponentsProps['MuiTimelineDot'];
    styleOverrides?: ComponentsOverrides['MuiTimelineDot'];
    variants?: ComponentsVariants['MuiTimelineDot'];
  };
  MuiTimelineItem?: {
    defaultProps?: ComponentsProps['MuiTimelineItem'];
    styleOverrides?: ComponentsOverrides['MuiTimelineItem'];
  };
  MuiTimelineOppositeContent?: {
    defaultProps?: ComponentsProps['MuiTimelineOppositeContent'];
    styleOverrides?: ComponentsOverrides['MuiTimelineOppositeContent'];
  };
  MuiTimelineSeparator?: {
    defaultProps?: ComponentsProps['MuiTimelineSeparator'];
    styleOverrides?: ComponentsOverrides['MuiTimelineSeparator'];
  };
  MuiTimePicker?: {
    defaultProps?: ComponentsProps['MuiTimePicker'];
  };
  MuiTimePickerToolbar?: {
    styleOverrides?: ComponentsOverrides['MuiTimePickerToolbar'];
  };
  MuiTreeItem?: {
    defaultProps?: ComponentsProps['MuiTreeItem'];
    styleOverrides?: ComponentsOverrides['MuiTreeItem'];
  };
  MuiTreeView?: {
    defaultProps?: ComponentsProps['MuiTreeView'];
    styleOverrides?: ComponentsOverrides['MuiTreeView'];
  };
  MuiCalendarPickerSkeleton?: {
    defaultProps?: ComponentsProps['MuiCalendarPickerSkeleton'];
    styleOverrides?: ComponentsOverrides['MuiCalendarPickerSkeleton'];
  };
  MuiClock?: {
    styleOverrides?: ComponentsOverrides['MuiClock'];
  };
  MuiClockNumber?: {
    styleOverrides?: ComponentsOverrides['MuiClockNumber'];
  };
  MuiClockPointer?: {
    styleOverrides?: ComponentsOverrides['MuiClockPointer'];
  };
  MuiDatePickerToolbar?: {
    styleOverrides?: ComponentsOverrides['MuiDatePickerToolbar'];
  };
  MuiDateTimePickerTabs?: {
    styleOverrides?: ComponentsOverrides['MuiDateTimePickerTabs'];
  };
  MuiDateTimePickerToolbar?: {
    styleOverrides?: ComponentsOverrides['MuiDateTimePickerToolbar'];
  };
  MuiDayPicker?: {
    defaultProps?: ComponentsProps['MuiDayPicker'];
    styleOverrides?: ComponentsOverrides['MuiDayPicker'];
  };
  MuiMonthPicker?: {
    defaultProps?: ComponentsProps['MuiMonthPicker'];
    styleOverrides?: ComponentsOverrides['MuiMonthPicker'];
  };
  MuiLoadingButton?: {
    defaultProps?: ComponentsProps['MuiLoadingButton'];
    styleOverrides?: ComponentsOverrides['MuiLoadingButton'];
  };
  MuiPickersArrowSwitcher?: {
    styleOverrides?: ComponentsOverrides['MuiPickersArrowSwitcher'];
  };
  MuiPickersCalendar?: {
    styleOverrides?: ComponentsOverrides['MuiPickersCalendar'];
  };
  MuiPickersCalendarHeader?: {
    styleOverrides?: ComponentsOverrides['MuiPickersCalendarHeader'];
  };
  MuiPickersDay?: {
    defaultProps?: ComponentsProps['MuiPickersDay'];
    styleOverrides?: ComponentsOverrides['MuiPickersDay'];
  };
  MuiStaticDatePicker?: {
    defaultProps?: ComponentsProps['MuiStaticDatePicker'];
  };
  MuiStaticDateTimePicker?: {
    defaultProps?: ComponentsProps['MuiStaticDateTimePicker'];
  };
  MuiStaticTimePicker?: {
    defaultProps?: ComponentsProps['MuiStaticTimePicker'];
  };
  MuiPickersFadeTransition?: {
    styleOverrides?: ComponentsOverrides['MuiPickersFadeTransition'];
  };
  MuiPickersModalDialog?: {
    styleOverrides?: ComponentsOverrides['MuiPickersModalDialog'];
  };
  MuiPickersMonth?: {
    styleOverrides?: ComponentsOverrides['MuiPickersMonth'];
  };
  MuiPickersPopper?: {
    styleOverrides?: ComponentsOverrides['MuiPickersPopper'];
  };
  MuiPickersSlideTransition?: {
    styleOverrides?: ComponentsOverrides['MuiPickersSlideTransition'];
  };
  MuiPickersToolbar?: {
    styleOverrides?: ComponentsOverrides['MuiPickersToolbar'];
  };
  MuiPickersToolbarButton?: {
    styleOverrides?: ComponentsOverrides['MuiPickersToolbarButton'];
  };
  MuiPickersToolbarText?: {
    styleOverrides?: ComponentsOverrides['MuiPickersToolbarText'];
  };
  MuiPickersYear?: {
    styleOverrides?: ComponentsOverrides['MuiPickersYear'];
  };
  MuiYearPicker?: {
    defaultProps?: ComponentsProps['MuiYearPicker'];
    styleOverrides?: ComponentsOverrides['MuiYearPicker'];
  };
}

declare module '@material-ui/core/styles/components' {
  interface Components extends LabComponents {}
}
