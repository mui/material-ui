import { ComponentsProps, ComponentsOverrides, ComponentsVariants } from '@material-ui/core';

export interface LabComponents {
  MuiAlert?: {
    props?: ComponentsProps['MuiAlert'];
    overrides?: ComponentsOverrides['MuiAlert'];
    variants?: ComponentsVariants['MuiAlert'];
  };
  MuiAlertTitle?: {
    props?: ComponentsProps['MuiAlertTitle'];
    overrides?: ComponentsOverrides['MuiAlertTitle'];
  };
  MuiAutocomplete?: {
    props?: ComponentsProps['MuiAutocomplete'];
    overrides?: ComponentsOverrides['MuiAutocomplete'];
  };
  MuiAvatarGroup?: {
    props?: ComponentsProps['MuiAvatarGroup'];
    overrides?: ComponentsOverrides['MuiAvatarGroup'];
  };
  MuiPagination?: {
    props?: ComponentsProps['MuiPagination'];
    overrides?: ComponentsOverrides['MuiPagination'];
    variants?: ComponentsVariants['MuiPagination'];
  };
  MuiPaginationItem?: {
    props?: ComponentsProps['MuiPaginationItem'];
    overrides?: ComponentsOverrides['MuiPaginationItem'];
    variants?: ComponentsVariants['MuiPaginationItem'];
  };
  MuiRating?: {
    props?: ComponentsProps['MuiRating'];
    overrides?: ComponentsOverrides['MuiRating'];
  };
  MuiSkeleton?: {
    props?: ComponentsProps['MuiSkeleton'];
    overrides?: ComponentsOverrides['MuiSkeleton'];
    variants?: ComponentsVariants['MuiSkeleton'];
  };
  MuiSpeedDial?: {
    props?: ComponentsProps['MuiSpeedDial'];
    overrides?: ComponentsOverrides['MuiSpeedDial'];
  };
  MuiSpeedDialAction?: {
    props?: ComponentsProps['MuiSpeedDialAction'];
    overrides?: ComponentsOverrides['MuiSpeedDialAction'];
  };
  MuiSpeedDialIcon?: {
    props?: ComponentsProps['MuiSpeedDialIcon'];
    overrides?: ComponentsOverrides['MuiSpeedDialIcon'];
  };
  MuiTabList?: {
    props?: ComponentsProps['MuiTabList'];
    overrides?: ComponentsOverrides['MuiTabList'];
  };
  MuiTabPanel?: {
    props?: ComponentsProps['MuiTabPanel'];
    overrides?: ComponentsOverrides['MuiTabPanel'];
  };
  MuiTimeline?: {
    props?: ComponentsProps['MuiTimeline'];
    overrides?: ComponentsOverrides['MuiTimeline'];
  };
  MuiTimelineConnector?: {
    props?: ComponentsProps['MuiTimelineConnector'];
    overrides?: ComponentsOverrides['MuiTimelineConnector'];
  };
  MuiTimelineContent?: {
    props?: ComponentsProps['MuiTimelineContent'];
    overrides?: ComponentsOverrides['MuiTimelineContent'];
  };
  MuiTimelineDot?: {
    props?: ComponentsProps['MuiTimelineDot'];
    overrides?: ComponentsOverrides['MuiTimelineDot'];
    variants?: ComponentsVariants['MuiTimelineDot'];
  };
  MuiTimelineItem?: {
    props?: ComponentsProps['MuiTimelineItem'];
    overrides?: ComponentsOverrides['MuiTimelineItem'];
  };
  MuiTimelineOppositeContent?: {
    props?: ComponentsProps['MuiTimelineOppositeContent'];
    overrides?: ComponentsOverrides['MuiTimelineOppositeContent'];
  };
  MuiTimelineSeparator?: {
    props?: ComponentsProps['MuiTimelineSeparator'];
    overrides?: ComponentsOverrides['MuiTimelineSeparator'];
  };
  MuiToggleButton?: {
    props?: ComponentsProps['MuiToggleButton'];
    overrides?: ComponentsOverrides['MuiToggleButton'];
  };
  MuiToggleButtonGroup?: {
    props?: ComponentsProps['MuiToggleButtonGroup'];
    overrides?: ComponentsOverrides['MuiToggleButtonGroup'];
  };
  MuiTreeItem?: {
    props?: ComponentsProps['MuiTreeItem'];
    overrides?: ComponentsOverrides['MuiTreeItem'];
  };
  MuiTreeView?: {
    props?: ComponentsProps['MuiTreeView'];
    overrides?: ComponentsOverrides['MuiTreeView'];
  };
}

declare module '@material-ui/core/styles/components' {
  interface Components extends LabComponents {}
}
