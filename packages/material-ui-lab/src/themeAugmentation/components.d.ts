import { ComponentsProps, ComponentsOverrides, ComponentsVariants } from '@material-ui/core';

export interface LabComponents {
  MuiCalendarPicker?: {
    defaultProps?: ComponentsProps['MuiCalendarPicker'];
    styleOverrides?: ComponentsOverrides['MuiCalendarPicker'];
  };
  MuiCalendarPickerSkeleton?: {
    defaultProps?: ComponentsProps['MuiCalendarPickerSkeleton'];
    styleOverrides?: ComponentsOverrides['MuiCalendarPickerSkeleton'];
  };
  MuiClockPicker?: {
    defaultProps?: ComponentsProps['MuiClockPicker'];
    styleOverrides?: ComponentsOverrides['MuiClockPicker'];
  };
  MuiDateRangePickerDay?: {
    defaultProps?: ComponentsProps['MuiDateRangePickerDay'];
    styleOverrides?: ComponentsOverrides['MuiDateRangePickerDay'];
  };
  MuiLoadingButton?: {
    defaultProps?: ComponentsProps['MuiLoadingButton'];
    styleOverrides?: ComponentsOverrides['MuiLoadingButton'];
  };
  MuiMonthPicker?: {
    defaultProps?: ComponentsProps['MuiMonthPicker'];
    styleOverrides?: ComponentsOverrides['MuiMonthPicker'];
  };
  MuiPickersDay?: {
    defaultProps?: ComponentsProps['MuiPickersDay'];
    styleOverrides?: ComponentsOverrides['MuiPickersDay'];
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
  MuiTreeItem?: {
    defaultProps?: ComponentsProps['MuiTreeItem'];
    styleOverrides?: ComponentsOverrides['MuiTreeItem'];
  };
  MuiTreeView?: {
    defaultProps?: ComponentsProps['MuiTreeView'];
    styleOverrides?: ComponentsOverrides['MuiTreeView'];
  };
  MuiYearPicker?: {
    defaultProps?: ComponentsProps['MuiYearPicker'];
    styleOverrides?: ComponentsOverrides['MuiYearPicker'];
  };
}

declare module '@material-ui/core/styles/components' {
  interface Components extends LabComponents {}
}
