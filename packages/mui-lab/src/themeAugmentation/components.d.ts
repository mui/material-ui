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
  MuiLoadingButton?: {
    defaultProps?: ComponentsProps['MuiLoadingButton'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiLoadingButton'];
    variants?: ComponentsVariants['MuiLoadingButton'];
  };
  MuiMasonry?: {
    defaultProps?: ComponentsProps['MuiMasonry'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiMasonry'];
    variants?: ComponentsVariants['MuiMasonry'];
  };
  MuiTabList?: {
    defaultProps?: ComponentsProps['MuiTabList'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiTabList'];
    variants?: ComponentsVariants['MuiTabList'];
  };
  MuiTabPanel?: {
    defaultProps?: ComponentsProps['MuiTabPanel'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiTabPanel'];
    variants?: ComponentsVariants['MuiTabPanel'];
  };
  MuiTimeline?: {
    defaultProps?: ComponentsProps['MuiTimeline'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiTimeline'];
    variants?: ComponentsVariants['MuiTimeline'];
  };
  MuiTimelineConnector?: {
    defaultProps?: ComponentsProps['MuiTimelineConnector'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiTimelineConnector'];
    variants?: ComponentsVariants['MuiTimelineConnector'];
  };
  MuiTimelineContent?: {
    defaultProps?: ComponentsProps['MuiTimelineContent'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiTimelineContent'];
    variants?: ComponentsVariants['MuiTimelineContent'];
  };
  MuiTimelineDot?: {
    defaultProps?: ComponentsProps['MuiTimelineDot'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiTimelineDot'];
    variants?: ComponentsVariants['MuiTimelineDot'];
  };
  MuiTimelineItem?: {
    defaultProps?: ComponentsProps['MuiTimelineItem'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiTimelineItem'];
    variants?: ComponentsVariants['MuiTimelineItem'];
  };
  MuiTimelineOppositeContent?: {
    defaultProps?: ComponentsProps['MuiTimelineOppositeContent'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiTimelineOppositeContent'];
    variants?: ComponentsVariants['MuiTimelineOppositeContent'];
  };
  MuiTimelineSeparator?: {
    defaultProps?: ComponentsProps['MuiTimelineSeparator'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiTimelineSeparator'];
    variants?: ComponentsVariants['MuiTimelineSeparator'];
  };
}

declare module '@mui/material/styles' {
  interface Components extends LabComponents {}
}
