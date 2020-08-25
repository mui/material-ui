import { ComponentsProps, ComponentsOverrides, ComponentsVariants } from '@material-ui/core';

export interface LabComponents {
  MuiAlert?: {
    defaultProps?: ComponentsProps['MuiAlert'];
    stylesOverrides?: ComponentsOverrides['MuiAlert'];
    variants?: ComponentsVariants['MuiAlert'];
  };
  MuiAlertTitle?: {
    defaultProps?: ComponentsProps['MuiAlertTitle'];
    stylesOverrides?: ComponentsOverrides['MuiAlertTitle'];
  };
  MuiAutocomplete?: {
    defaultProps?: ComponentsProps['MuiAutocomplete'];
    stylesOverrides?: ComponentsOverrides['MuiAutocomplete'];
  };
  MuiAvatarGroup?: {
    defaultProps?: ComponentsProps['MuiAvatarGroup'];
    stylesOverrides?: ComponentsOverrides['MuiAvatarGroup'];
  };
  MuiPagination?: {
    defaultProps?: ComponentsProps['MuiPagination'];
    stylesOverrides?: ComponentsOverrides['MuiPagination'];
    variants?: ComponentsVariants['MuiPagination'];
  };
  MuiPaginationItem?: {
    defaultProps?: ComponentsProps['MuiPaginationItem'];
    stylesOverrides?: ComponentsOverrides['MuiPaginationItem'];
    variants?: ComponentsVariants['MuiPaginationItem'];
  };
  MuiRating?: {
    defaultProps?: ComponentsProps['MuiRating'];
    stylesOverrides?: ComponentsOverrides['MuiRating'];
  };
  MuiSkeleton?: {
    defaultProps?: ComponentsProps['MuiSkeleton'];
    stylesOverrides?: ComponentsOverrides['MuiSkeleton'];
    variants?: ComponentsVariants['MuiSkeleton'];
  };
  MuiSpeedDial?: {
    defaultProps?: ComponentsProps['MuiSpeedDial'];
    stylesOverrides?: ComponentsOverrides['MuiSpeedDial'];
  };
  MuiSpeedDialAction?: {
    defaultProps?: ComponentsProps['MuiSpeedDialAction'];
    stylesOverrides?: ComponentsOverrides['MuiSpeedDialAction'];
  };
  MuiSpeedDialIcon?: {
    defaultProps?: ComponentsProps['MuiSpeedDialIcon'];
    stylesOverrides?: ComponentsOverrides['MuiSpeedDialIcon'];
  };
  MuiTabList?: {
    defaultProps?: ComponentsProps['MuiTabList'];
    stylesOverrides?: ComponentsOverrides['MuiTabList'];
  };
  MuiTabPanel?: {
    defaultProps?: ComponentsProps['MuiTabPanel'];
    stylesOverrides?: ComponentsOverrides['MuiTabPanel'];
  };
  MuiTimeline?: {
    defaultProps?: ComponentsProps['MuiTimeline'];
    stylesOverrides?: ComponentsOverrides['MuiTimeline'];
  };
  MuiTimelineConnector?: {
    defaultProps?: ComponentsProps['MuiTimelineConnector'];
    stylesOverrides?: ComponentsOverrides['MuiTimelineConnector'];
  };
  MuiTimelineContent?: {
    defaultProps?: ComponentsProps['MuiTimelineContent'];
    stylesOverrides?: ComponentsOverrides['MuiTimelineContent'];
  };
  MuiTimelineDot?: {
    defaultProps?: ComponentsProps['MuiTimelineDot'];
    stylesOverrides?: ComponentsOverrides['MuiTimelineDot'];
    variants?: ComponentsVariants['MuiTimelineDot'];
  };
  MuiTimelineItem?: {
    defaultProps?: ComponentsProps['MuiTimelineItem'];
    stylesOverrides?: ComponentsOverrides['MuiTimelineItem'];
  };
  MuiTimelineOppositeContent?: {
    defaultProps?: ComponentsProps['MuiTimelineOppositeContent'];
    stylesOverrides?: ComponentsOverrides['MuiTimelineOppositeContent'];
  };
  MuiTimelineSeparator?: {
    defaultProps?: ComponentsProps['MuiTimelineSeparator'];
    stylesOverrides?: ComponentsOverrides['MuiTimelineSeparator'];
  };
  MuiToggleButton?: {
    defaultProps?: ComponentsProps['MuiToggleButton'];
    stylesOverrides?: ComponentsOverrides['MuiToggleButton'];
  };
  MuiToggleButtonGroup?: {
    defaultProps?: ComponentsProps['MuiToggleButtonGroup'];
    stylesOverrides?: ComponentsOverrides['MuiToggleButtonGroup'];
  };
  MuiTreeItem?: {
    defaultProps?: ComponentsProps['MuiTreeItem'];
    stylesOverrides?: ComponentsOverrides['MuiTreeItem'];
  };
  MuiTreeView?: {
    defaultProps?: ComponentsProps['MuiTreeView'];
    stylesOverrides?: ComponentsOverrides['MuiTreeView'];
  };
}

declare module '@material-ui/core/styles/components' {
  interface Components extends LabComponents {}
}
