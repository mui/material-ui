import { AvatarGroupProps } from '../AvatarGroup';
import { LoadingButtonProps } from '../LoadingButton';
import { TabListProps } from '../TabList';
import { TabPanelProps } from '../TabPanel';
import { TimelineConnectorProps } from '../TimelineConnector';
import { TimelineContentProps } from '../TimelineContent';
import { TimelineDotProps } from '../TimelineDot';
import { TimelineItemProps } from '../TimelineItem';
import { TimelineOppositeContentProps } from '../TimelineOppositeContent';
import { TimelineProps } from '../Timeline';
import { TimelineSeparatorProps } from '../TimelineSeparator';
import { TreeItemProps } from '../TreeItem';
import { TreeViewProps } from '../TreeView';
import { MasonryProps } from '../Masonry';

export interface LabComponentsPropsList {
  MuiAvatarGroup: AvatarGroupProps;
  MuiLoadingButton: LoadingButtonProps;
  MuiMasonry: MasonryProps;
  MuiTabList: TabListProps;
  MuiTabPanel: TabPanelProps;
  MuiTimeline: TimelineProps;
  MuiTimelineConnector: TimelineConnectorProps;
  MuiTimelineContent: TimelineContentProps;
  MuiTimelineDot: TimelineDotProps;
  MuiTimelineItem: TimelineItemProps;
  MuiTimelineOppositeContent: TimelineOppositeContentProps;
  MuiTimelineSeparator: TimelineSeparatorProps;
  MuiTreeItem: TreeItemProps;
  MuiTreeView: TreeViewProps;
}

declare module '@mui/material/styles' {
  interface ComponentsPropsList extends LabComponentsPropsList {}
}

// disable automatic export
export {};
