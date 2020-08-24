import { ComponentsProps, ComponentsOverrides, ComponentsVariants } from '@material-ui/core';

export interface LabComponents {
  MuiAlert?: {
    defaultProps?: ComponentsProps['MuiAlert'];
    cssOverrides?: ComponentsOverrides['MuiAlert'];
    variants?: ComponentsVariants['MuiAlert'];
  };
  MuiAlertTitle?: {
    defaultProps?: ComponentsProps['MuiAlertTitle'];
    cssOverrides?: ComponentsOverrides['MuiAlertTitle'];
  };
  MuiAutocomplete?: {
    defaultProps?: ComponentsProps['MuiAutocomplete'];
    cssOverrides?: ComponentsOverrides['MuiAutocomplete'];
  };
  MuiAvatarGroup?: {
    defaultProps?: ComponentsProps['MuiAvatarGroup'];
    cssOverrides?: ComponentsOverrides['MuiAvatarGroup'];
  };
  MuiPagination?: {
    defaultProps?: ComponentsProps['MuiPagination'];
    cssOverrides?: ComponentsOverrides['MuiPagination'];
    variants?: ComponentsVariants['MuiPagination'];
  };
  MuiPaginationItem?: {
    defaultProps?: ComponentsProps['MuiPaginationItem'];
    cssOverrides?: ComponentsOverrides['MuiPaginationItem'];
    variants?: ComponentsVariants['MuiPaginationItem'];
  };
  MuiRating?: {
    defaultProps?: ComponentsProps['MuiRating'];
    cssOverrides?: ComponentsOverrides['MuiRating'];
  };
  MuiSkeleton?: {
    defaultProps?: ComponentsProps['MuiSkeleton'];
    cssOverrides?: ComponentsOverrides['MuiSkeleton'];
    variants?: ComponentsVariants['MuiSkeleton'];
  };
  MuiSpeedDial?: {
    defaultProps?: ComponentsProps['MuiSpeedDial'];
    cssOverrides?: ComponentsOverrides['MuiSpeedDial'];
  };
  MuiSpeedDialAction?: {
    defaultProps?: ComponentsProps['MuiSpeedDialAction'];
    cssOverrides?: ComponentsOverrides['MuiSpeedDialAction'];
  };
  MuiSpeedDialIcon?: {
    defaultProps?: ComponentsProps['MuiSpeedDialIcon'];
    cssOverrides?: ComponentsOverrides['MuiSpeedDialIcon'];
  };
  MuiTabList?: {
    defaultProps?: ComponentsProps['MuiTabList'];
    cssOverrides?: ComponentsOverrides['MuiTabList'];
  };
  MuiTabPanel?: {
    defaultProps?: ComponentsProps['MuiTabPanel'];
    cssOverrides?: ComponentsOverrides['MuiTabPanel'];
  };
  MuiTimeline?: {
    defaultProps?: ComponentsProps['MuiTimeline'];
    cssOverrides?: ComponentsOverrides['MuiTimeline'];
  };
  MuiTimelineConnector?: {
    defaultProps?: ComponentsProps['MuiTimelineConnector'];
    cssOverrides?: ComponentsOverrides['MuiTimelineConnector'];
  };
  MuiTimelineContent?: {
    defaultProps?: ComponentsProps['MuiTimelineContent'];
    cssOverrides?: ComponentsOverrides['MuiTimelineContent'];
  };
  MuiTimelineDot?: {
    defaultProps?: ComponentsProps['MuiTimelineDot'];
    cssOverrides?: ComponentsOverrides['MuiTimelineDot'];
    variants?: ComponentsVariants['MuiTimelineDot'];
  };
  MuiTimelineItem?: {
    defaultProps?: ComponentsProps['MuiTimelineItem'];
    cssOverrides?: ComponentsOverrides['MuiTimelineItem'];
  };
  MuiTimelineOppositeContent?: {
    defaultProps?: ComponentsProps['MuiTimelineOppositeContent'];
    cssOverrides?: ComponentsOverrides['MuiTimelineOppositeContent'];
  };
  MuiTimelineSeparator?: {
    defaultProps?: ComponentsProps['MuiTimelineSeparator'];
    cssOverrides?: ComponentsOverrides['MuiTimelineSeparator'];
  };
  MuiToggleButton?: {
    defaultProps?: ComponentsProps['MuiToggleButton'];
    cssOverrides?: ComponentsOverrides['MuiToggleButton'];
  };
  MuiToggleButtonGroup?: {
    defaultProps?: ComponentsProps['MuiToggleButtonGroup'];
    cssOverrides?: ComponentsOverrides['MuiToggleButtonGroup'];
  };
  MuiTreeItem?: {
    defaultProps?: ComponentsProps['MuiTreeItem'];
    cssOverrides?: ComponentsOverrides['MuiTreeItem'];
  };
  MuiTreeView?: {
    defaultProps?: ComponentsProps['MuiTreeView'];
    cssOverrides?: ComponentsOverrides['MuiTreeView'];
  };
}

declare module '@material-ui/core/styles/components' {
  interface Components extends LabComponents {}
}
