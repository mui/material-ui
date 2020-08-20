import { ComponentsProps } from '@material-ui/core/styles/props';
import { Overrides } from '@material-ui/core/styles/overrides';
import { Variants } from '@material-ui/core/styles/variants';

export interface LabComponents {
  MuiAlert: {
    props?: ComponentsProps['MuiAlert'];
    variants?: Variants['MuiAlert'];
    overrides?: Overrides['MuiAlert'];
  };
  MuiAlertTitle: {
    props?: ComponentsProps['MuiAlertTitle'];
    variants?: Variants['MuiAlertTitle'];
    overrides?: Overrides['MuiAlertTitle'];
  };
  MuiAutocomplete: {
    props?: ComponentsProps['MuiAutocomplete'];
    variants?: Variants['MuiAutocomplete'];
    overrides?: Overrides['MuiAutocomplete'];
  };
  MuiAvatarGroup: {
    props?: ComponentsProps['MuiAvatarGroup'];
    variants?: Variants['MuiAvatarGroup'];
    overrides?: Overrides['MuiAvatarGroup'];
  };
  MuiPagination: {
    props?: ComponentsProps['MuiPagination'];
    variants?: Variants['MuiPagination'];
    overrides?: Overrides['MuiPagination'];
  };
  MuiPaginationItem: {
    props?: ComponentsProps['MuiPaginationItem'];
    variants?: Variants['MuiPaginationItem'];
    overrides?: Overrides['MuiPaginationItem'];
  };
  MuiRating: {
    props?: ComponentsProps['MuiRating'];
    variants?: Variants['MuiRating'];
    overrides?: Overrides['MuiRating'];
  };
  MuiSkeleton: {
    props?: ComponentsProps['MuiSkeleton'];
    variants?: Variants['MuiSkeleton'];
    overrides?: Overrides['MuiSkeleton'];
  };
  MuiSpeedDial: {
    props?: ComponentsProps['MuiSpeedDial'];
    variants?: Variants['MuiSpeedDial'];
    overrides?: Overrides['MuiSpeedDial'];
  };
  MuiSpeedDialAction: {
    props?: ComponentsProps['MuiSpeedDialAction'];
    variants?: Variants['MuiSpeedDialAction'];
    overrides?: Overrides['MuiSpeedDialAction'];
  };
  MuiSpeedDialIcon: {
    props?: ComponentsProps['MuiSpeedDialIcon'];
    variants?: Variants['MuiSpeedDialIcon'];
    overrides?: Overrides['MuiSpeedDialIcon'];
  };
  MuiTabList: {
    props?: ComponentsProps['MuiTabList'];
    variants?: Variants['MuiTabList'];
    overrides?: Overrides['MuiTabList'];
  };
  MuiTabPanel: {
    props?: ComponentsProps['MuiTabPanel'];
    variants?: Variants['MuiTabPanel'];
    overrides?: Overrides['MuiTabPanel'];
  };
  MuiTimeline: {
    props?: ComponentsProps['MuiTimeline'];
    variants?: Variants['MuiTimeline'];
    overrides?: Overrides['MuiTimeline'];
  };
  MuiTimelineConnector: {
    props?: ComponentsProps['MuiTimelineConnector'];
    variants?: Variants['MuiTimelineConnector'];
    overrides?: Overrides['MuiTimelineConnector'];
  };
  MuiTimelineContent: {
    props?: ComponentsProps['MuiTimelineContent'];
    variants?: Variants['MuiTimelineContent'];
    overrides?: Overrides['MuiTimelineContent'];
  };
  MuiTimelineDot: {
    props?: ComponentsProps['MuiTimelineDot'];
    variants?: Variants['MuiTimelineDot'];
    overrides?: Overrides['MuiTimelineDot'];
  };
  MuiTimelineItem: {
    props?: ComponentsProps['MuiTimelineItem'];
    variants?: Variants['MuiTimelineItem'];
    overrides?: Overrides['MuiTimelineItem'];
  };
  MuiTimelineOppositeContent: {
    props?: ComponentsProps['MuiTimelineOppositeContent'];
    variants?: Variants['MuiTimelineOppositeContent'];
    overrides?: Overrides['MuiTimelineOppositeContent'];
  };
  MuiTimelineSeparator: {
    props?: ComponentsProps['MuiTimelineSeparator'];
    variants?: Variants['MuiTimelineSeparator'];
    overrides?: Overrides['MuiTimelineSeparator'];
  };
  MuiToggleButton: {
    props?: ComponentsProps['MuiToggleButton'];
    variants?: Variants['MuiToggleButton'];
    overrides?: Overrides['MuiToggleButton'];
  };
  MuiToggleButtonGroup: {
    props?: ComponentsProps['MuiToggleButtonGroup'];
    variants?: Variants['MuiToggleButtonGroup'];
    overrides?: Overrides['MuiToggleButtonGroup'];
  };
  MuiTreeItem: {
    props?: ComponentsProps['MuiTreeItem'];
    variants?: Variants['MuiTreeItem'];
    overrides?: Overrides['MuiTreeItem'];
  };
  MuiTreeView: {
    props?: ComponentsProps['MuiTreeView'];
    variants?: Variants['MuiTreeView'];
    overrides?: Overrides['MuiTreeView'];
  };
}

declare module '@material-ui/core/styles/components' {
  interface Components extends LabComponents {}
}