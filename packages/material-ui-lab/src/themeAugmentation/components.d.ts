import { ComponentsProps, ComponentsOverrides, ComponentsVariants } from '@material-ui/core';

export interface LabComponents {
  MuiAvatarGroup?: {
    defaultProps?: ComponentsProps['MuiAvatarGroup'];
    styleOverrides?: ComponentsOverrides['MuiAvatarGroup'];
  };
  MuiPagination?: {
    defaultProps?: ComponentsProps['MuiPagination'];
    styleOverrides?: ComponentsOverrides['MuiPagination'];
    variants?: ComponentsVariants['MuiPagination'];
  };
  MuiPaginationItem?: {
    defaultProps?: ComponentsProps['MuiPaginationItem'];
    styleOverrides?: ComponentsOverrides['MuiPaginationItem'];
    variants?: ComponentsVariants['MuiPaginationItem'];
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
  MuiToggleButton?: {
    defaultProps?: ComponentsProps['MuiToggleButton'];
    styleOverrides?: ComponentsOverrides['MuiToggleButton'];
  };
  MuiToggleButtonGroup?: {
    defaultProps?: ComponentsProps['MuiToggleButtonGroup'];
    styleOverrides?: ComponentsOverrides['MuiToggleButtonGroup'];
  };
  MuiTreeItem?: {
    defaultProps?: ComponentsProps['MuiTreeItem'];
    styleOverrides?: ComponentsOverrides['MuiTreeItem'];
  };
  MuiTreeView?: {
    defaultProps?: ComponentsProps['MuiTreeView'];
    styleOverrides?: ComponentsOverrides['MuiTreeView'];
  };
}

declare module '@material-ui/core/styles/components' {
  interface Components extends LabComponents {}
}
