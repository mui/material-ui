import { ComponentsProps, ComponentsOverrides, ComponentsVariants } from '@material-ui/core';

export interface LabComponents {
  MuiAlert?: {
    props?: ComponentsProps['MuiAlert'];
    variants?: ComponentsVariants['MuiAlert'];
    overrides?: ComponentsOverrides['MuiAlert'];
  };
  MuiAlertTitle?: {
    props?: ComponentsProps['MuiAlertTitle'];
    variants?: ComponentsVariants['MuiAlertTitle'];
    overrides?: ComponentsOverrides['MuiAlertTitle'];
  };
  MuiAutocomplete?: {
    props?: ComponentsProps['MuiAutocomplete'];
    variants?: ComponentsVariants['MuiAutocomplete'];
    overrides?: ComponentsOverrides['MuiAutocomplete'];
  };
  MuiAvatarGroup?: {
    props?: ComponentsProps['MuiAvatarGroup'];
    variants?: ComponentsVariants['MuiAvatarGroup'];
    overrides?: ComponentsOverrides['MuiAvatarGroup'];
  };
  MuiPagination?: {
    props?: ComponentsProps['MuiPagination'];
    variants?: ComponentsVariants['MuiPagination'];
    overrides?: ComponentsOverrides['MuiPagination'];
  };
  MuiPaginationItem?: {
    props?: ComponentsProps['MuiPaginationItem'];
    variants?: ComponentsVariants['MuiPaginationItem'];
    overrides?: ComponentsOverrides['MuiPaginationItem'];
  };
  MuiRating?: {
    props?: ComponentsProps['MuiRating'];
    variants?: ComponentsVariants['MuiRating'];
    overrides?: ComponentsOverrides['MuiRating'];
  };
  MuiSkeleton?: {
    props?: ComponentsProps['MuiSkeleton'];
    variants?: ComponentsVariants['MuiSkeleton'];
    overrides?: ComponentsOverrides['MuiSkeleton'];
  };
  MuiSpeedDial?: {
    props?: ComponentsProps['MuiSpeedDial'];
    variants?: ComponentsVariants['MuiSpeedDial'];
    overrides?: ComponentsOverrides['MuiSpeedDial'];
  };
  MuiSpeedDialAction?: {
    props?: ComponentsProps['MuiSpeedDialAction'];
    variants?: ComponentsVariants['MuiSpeedDialAction'];
    overrides?: ComponentsOverrides['MuiSpeedDialAction'];
  };
  MuiSpeedDialIcon?: {
    props?: ComponentsProps['MuiSpeedDialIcon'];
    variants?: ComponentsVariants['MuiSpeedDialIcon'];
    overrides?: ComponentsOverrides['MuiSpeedDialIcon'];
  };
  MuiTabList?: {
    props?: ComponentsProps['MuiTabList'];
    variants?: ComponentsVariants['MuiTabList'];
    overrides?: ComponentsOverrides['MuiTabList'];
  };
  MuiTabPanel?: {
    props?: ComponentsProps['MuiTabPanel'];
    variants?: ComponentsVariants['MuiTabPanel'];
    overrides?: ComponentsOverrides['MuiTabPanel'];
  };
  MuiTimeline?: {
    props?: ComponentsProps['MuiTimeline'];
    variants?: ComponentsVariants['MuiTimeline'];
    overrides?: ComponentsOverrides['MuiTimeline'];
  };
  MuiTimelineConnector?: {
    props?: ComponentsProps['MuiTimelineConnector'];
    variants?: ComponentsVariants['MuiTimelineConnector'];
    overrides?: ComponentsOverrides['MuiTimelineConnector'];
  };
  MuiTimelineContent?: {
    props?: ComponentsProps['MuiTimelineContent'];
    variants?: ComponentsVariants['MuiTimelineContent'];
    overrides?: ComponentsOverrides['MuiTimelineContent'];
  };
  MuiTimelineDot?: {
    props?: ComponentsProps['MuiTimelineDot'];
    variants?: ComponentsVariants['MuiTimelineDot'];
    overrides?: ComponentsOverrides['MuiTimelineDot'];
  };
  MuiTimelineItem?: {
    props?: ComponentsProps['MuiTimelineItem'];
    variants?: ComponentsVariants['MuiTimelineItem'];
    overrides?: ComponentsOverrides['MuiTimelineItem'];
  };
  MuiTimelineOppositeContent?: {
    props?: ComponentsProps['MuiTimelineOppositeContent'];
    variants?: ComponentsVariants['MuiTimelineOppositeContent'];
    overrides?: ComponentsOverrides['MuiTimelineOppositeContent'];
  };
  MuiTimelineSeparator?: {
    props?: ComponentsProps['MuiTimelineSeparator'];
    variants?: ComponentsVariants['MuiTimelineSeparator'];
    overrides?: ComponentsOverrides['MuiTimelineSeparator'];
  };
  MuiToggleButton?: {
    props?: ComponentsProps['MuiToggleButton'];
    variants?: ComponentsVariants['MuiToggleButton'];
    overrides?: ComponentsOverrides['MuiToggleButton'];
  };
  MuiToggleButtonGroup?: {
    props?: ComponentsProps['MuiToggleButtonGroup'];
    variants?: ComponentsVariants['MuiToggleButtonGroup'];
    overrides?: ComponentsOverrides['MuiToggleButtonGroup'];
  };
  MuiTreeItem?: {
    props?: ComponentsProps['MuiTreeItem'];
    variants?: ComponentsVariants['MuiTreeItem'];
    overrides?: ComponentsOverrides['MuiTreeItem'];
  };
  MuiTreeView?: {
    props?: ComponentsProps['MuiTreeView'];
    variants?: ComponentsVariants['MuiTreeView'];
    overrides?: ComponentsOverrides['MuiTreeView'];
  };
}

declare module '@material-ui/core/styles/components' {
  interface Components extends LabComponents {}
}
