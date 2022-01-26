import {
  ComponentsProps,
  ComponentsOverrides,
  ComponentsVariants,
  Theme as MuiTheme,
} from '@mui/material/styles';

type Theme = Omit<MuiTheme, 'components'>;

// shut off automatic exporting for the `Theme` above
export {};

export interface LabComponents {
  MuiCalendarPicker?: {
    defaultProps?: ComponentsProps['MuiCalendarPicker'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiCalendarPicker'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiCalendarPicker'];
  };
  MuiCalendarPickerSkeleton?: {
    defaultProps?: ComponentsProps['MuiCalendarPickerSkeleton'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiCalendarPickerSkeleton'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiCalendarPickerSkeleton'];
  };
  MuiClockPicker?: {
    defaultProps?: ComponentsProps['MuiClockPicker'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiClockPicker'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiClockPicker'];
  };
  MuiDatePicker?: {
    defaultProps?: ComponentsProps['MuiDatePicker'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiDatePicker'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiDatePicker'];
  };
  MuiDateRangePickerDay?: {
    defaultProps?: ComponentsProps['MuiDateRangePickerDay'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiDateRangePickerDay'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiDateRangePickerDay'];
  };
  MuiDateTimePicker?: {
    defaultProps?: ComponentsProps['MuiDateTimePicker'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiDateTimePicker'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiDateTimePicker'];
  };
  MuiLoadingButton?: {
    defaultProps?: ComponentsProps['MuiLoadingButton'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiLoadingButton'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiLoadingButton'];
  };
  MuiMonthPicker?: {
    defaultProps?: ComponentsProps['MuiMonthPicker'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiMonthPicker'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiMonthPicker'];
  };
  MuiPickersDay?: {
    defaultProps?: ComponentsProps['MuiPickersDay'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiPickersDay'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiPickersDay'];
  };
  MuiTabList?: {
    defaultProps?: ComponentsProps['MuiTabList'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiTabList'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiTabList'];
  };
  MuiTabPanel?: {
    defaultProps?: ComponentsProps['MuiTabPanel'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiTabPanel'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiTabPanel'];
  };
  MuiTimeline?: {
    defaultProps?: ComponentsProps['MuiTimeline'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiTimeline'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiTimeline'];
  };
  MuiTimelineConnector?: {
    defaultProps?: ComponentsProps['MuiTimelineConnector'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiTimelineConnector'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiTimelineConnector'];
  };
  MuiTimelineContent?: {
    defaultProps?: ComponentsProps['MuiTimelineContent'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiTimelineContent'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiTimelineContent'];
  };
  MuiTimelineDot?: {
    defaultProps?: ComponentsProps['MuiTimelineDot'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiTimelineDot'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiTimelineDot'];
  };
  MuiTimelineItem?: {
    defaultProps?: ComponentsProps['MuiTimelineItem'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiTimelineItem'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiTimelineItem'];
  };
  MuiTimelineOppositeContent?: {
    defaultProps?: ComponentsProps['MuiTimelineOppositeContent'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiTimelineOppositeContent'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiTimelineOppositeContent'];
  };
  MuiTimelineSeparator?: {
    defaultProps?: ComponentsProps['MuiTimelineSeparator'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiTimelineSeparator'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiTimelineSeparator'];
  };
  MuiTreeItem?: {
    defaultProps?: ComponentsProps['MuiTreeItem'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiTreeItem'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiTreeItem'];
  };
  MuiTreeView?: {
    defaultProps?: ComponentsProps['MuiTreeView'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiTreeView'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiTreeView'];
  };
  MuiYearPicker?: {
    defaultProps?: ComponentsProps['MuiYearPicker'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiYearPicker'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiYearPicker'];
  };
  MuiPickerStaticWrapper?: {
    defaultProps?: ComponentsProps['MuiPickerStaticWrapper'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiPickerStaticWrapper'];
    /**
     * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
     */
    variants?: ComponentsVariants['MuiPickerStaticWrapper'];
  };
}

declare module '@mui/material/styles' {
  interface Components extends LabComponents {}
}
