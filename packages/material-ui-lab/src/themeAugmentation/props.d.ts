import { AutocompleteProps } from '../Autocomplete';
import { AvatarGroupProps } from '../AvatarGroup';
import { PaginationProps } from '../Pagination';
import { PaginationItemProps } from '../PaginationItem';
import { TabListProps } from '../TabList';
import { TabPanelProps } from '../TabPanel';
import { TimelineProps } from '../Timeline';
import { TimelineConnectorProps } from '../TimelineConnector';
import { TimelineContentProps } from '../TimelineContent';
import { TimelineDotProps } from '../TimelineDot';
import { TimelineItemProps } from '../TimelineItem';
import { TimelineOppositeContentProps } from '../TimelineOppositeContent';
import { TimelineSeparatorProps } from '../TimelineSeparator';
import { ToggleButtonProps } from '../ToggleButton';
import { ToggleButtonGroupProps } from '../ToggleButtonGroup';
import { TreeItemProps } from '../TreeItem';
import { TreeViewProps } from '../TreeView';

export interface LabComponentsPropsList {
  MuiAutocomplete: AutocompleteProps<any, any, any, any>;
  MuiAvatarGroup: AvatarGroupProps;
  MuiPagination: PaginationProps;
  MuiPaginationItem: PaginationItemProps;
  MuiTabList: TabListProps;
  MuiTabPanel: TabPanelProps;
  MuiTimeline: TimelineProps;
  MuiTimelineConnector: TimelineConnectorProps;
  MuiTimelineContent: TimelineContentProps;
  MuiTimelineDot: TimelineDotProps;
  MuiTimelineItem: TimelineItemProps;
  MuiTimelineOppositeContent: TimelineOppositeContentProps;
  MuiTimelineSeparator: TimelineSeparatorProps;
  MuiToggleButton: ToggleButtonProps;
  MuiToggleButtonGroup: ToggleButtonGroupProps;
  MuiTreeItem: TreeItemProps;
  MuiTreeView: TreeViewProps;
}

declare module '@material-ui/core/styles/props' {
  interface ComponentsPropsList extends LabComponentsPropsList {}
}

// disable automatic export
export {};
