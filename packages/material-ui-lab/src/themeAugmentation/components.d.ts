import { ComponentsProps, ComponentsOverrides, ComponentsVariants } from '@mui/material/styles';

export interface LabComponents {
  MuiCalendarPicker?: {
    defaultProps?: ComponentsProps['MuiCalendarPicker'];
    styleOverrides?: ComponentsOverrides['MuiCalendarPicker'];
    variants?: ComponentsVariants['MuiCalendarPicker'];
  };
  MuiCalendarPickerSkeleton?: {
    defaultProps?: ComponentsProps['MuiCalendarPickerSkeleton'];
    styleOverrides?: ComponentsOverrides['MuiCalendarPickerSkeleton'];
    variants?: ComponentsVariants['MuiCalendarPickerSkeleton'];
  };
  MuiClockPicker?: {
    defaultProps?: ComponentsProps['MuiClockPicker'];
    styleOverrides?: ComponentsOverrides['MuiClockPicker'];
    variants?: ComponentsVariants['MuiClockPicker'];
  };
  MuiDateRangePickerDay?: {
    defaultProps?: ComponentsProps['MuiDateRangePickerDay'];
    styleOverrides?: ComponentsOverrides['MuiDateRangePickerDay'];
    variants?: ComponentsVariants['MuiDateRangePickerDay'];
  };
  MuiLoadingButton?: {
    defaultProps?: ComponentsProps['MuiLoadingButton'];
    styleOverrides?: ComponentsOverrides['MuiLoadingButton'];
    variants?: ComponentsVariants['MuiLoadingButton'];
  };
  MuiMonthPicker?: {
    defaultProps?: ComponentsProps['MuiMonthPicker'];
    styleOverrides?: ComponentsOverrides['MuiMonthPicker'];
    variants?: ComponentsVariants['MuiMonthPicker'];
  };
  MuiPickersDay?: {
    defaultProps?: ComponentsProps['MuiPickersDay'];
    styleOverrides?: ComponentsOverrides['MuiPickersDay'];
    variants?: ComponentsVariants['MuiPickersDay'];
  };
  MuiTabList?: {
    defaultProps?: ComponentsProps['MuiTabList'];
    styleOverrides?: ComponentsOverrides['MuiTabList'];
    variants?: ComponentsVariants['MuiTabList'];
  };
  MuiTabPanel?: {
    defaultProps?: ComponentsProps['MuiTabPanel'];
    styleOverrides?: ComponentsOverrides['MuiTabPanel'];
    variants?: ComponentsVariants['MuiTabPanel'];
  };
  MuiTimeline?: {
    defaultProps?: ComponentsProps['MuiTimeline'];
    styleOverrides?: ComponentsOverrides['MuiTimeline'];
    variants?: ComponentsVariants['MuiTimeline'];
  };
  MuiTimelineConnector?: {
    defaultProps?: ComponentsProps['MuiTimelineConnector'];
    styleOverrides?: ComponentsOverrides['MuiTimelineConnector'];
    variants?: ComponentsVariants['MuiTimelineConnector'];
  };
  MuiTimelineContent?: {
    defaultProps?: ComponentsProps['MuiTimelineContent'];
    styleOverrides?: ComponentsOverrides['MuiTimelineContent'];
    variants?: ComponentsVariants['MuiTimelineContent'];
  };
  MuiTimelineDot?: {
    defaultProps?: ComponentsProps['MuiTimelineDot'];
    styleOverrides?: ComponentsOverrides['MuiTimelineDot'];
    variants?: ComponentsVariants['MuiTimelineDot'];
  };
  MuiTimelineItem?: {
    defaultProps?: ComponentsProps['MuiTimelineItem'];
    styleOverrides?: ComponentsOverrides['MuiTimelineItem'];
    variants?: ComponentsVariants['MuiTimelineItem'];
  };
  MuiTimelineOppositeContent?: {
    defaultProps?: ComponentsProps['MuiTimelineOppositeContent'];
    styleOverrides?: ComponentsOverrides['MuiTimelineOppositeContent'];
    variants?: ComponentsVariants['MuiTimelineOppositeContent'];
  };
  MuiTimelineSeparator?: {
    defaultProps?: ComponentsProps['MuiTimelineSeparator'];
    styleOverrides?: ComponentsOverrides['MuiTimelineSeparator'];
    variants?: ComponentsVariants['MuiTimelineSeparator'];
  };
  MuiTreeItem?: {
    defaultProps?: ComponentsProps['MuiTreeItem'];
    styleOverrides?: ComponentsOverrides['MuiTreeItem'];
    variants?: ComponentsVariants['MuiTreeItem'];
  };
  MuiTreeView?: {
    defaultProps?: ComponentsProps['MuiTreeView'];
    styleOverrides?: ComponentsOverrides['MuiTreeView'];
    variants?: ComponentsVariants['MuiTreeView'];
  };
  MuiYearPicker?: {
    defaultProps?: ComponentsProps['MuiYearPicker'];
    styleOverrides?: ComponentsOverrides['MuiYearPicker'];
    variants?: ComponentsVariants['MuiYearPicker'];
  };
}

declare module '@mui/material/styles' {
  interface Components extends LabComponents {}
}
