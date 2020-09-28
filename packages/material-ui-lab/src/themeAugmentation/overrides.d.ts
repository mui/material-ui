import { AutocompleteClassKey } from '../Autocomplete';
import { AvatarGroupClassKey } from '../AvatarGroup';
import { PaginationClassKey } from '../Pagination';
import { PaginationItemClassKey } from '../PaginationItem';
import { SpeedDialClassKey } from '../SpeedDial';
import { SpeedDialActionClassKey } from '../SpeedDialAction';
import { SpeedDialIconClassKey } from '../SpeedDialIcon';
import { TabListClassKey } from '../TabList';
import { TabPanelClassKey } from '../TabPanel';
import { TimelineClassKey } from '../Timeline';
import { TimelineConnectorClassKey } from '../TimelineConnector';
import { TimelineContentClassKey } from '../TimelineContent';
import { TimelineDotClassKey } from '../TimelineDot';
import { TimelineItemClassKey } from '../TimelineItem';
import { TimelineOppositeContentClassKey } from '../TimelineOppositeContent';
import { TimelineSeparatorClassKey } from '../TimelineSeparator';
import { ToggleButtonClassKey } from '../ToggleButton';
import { ToggleButtonGroupClassKey } from '../ToggleButtonGroup';
import { TreeItemClassKey } from '../TreeItem';
import { TreeViewClassKey } from '../TreeView';

export interface LabComponentNameToClassKey {
  MuiAutocomplete: AutocompleteClassKey;
  MuiAvatarGroup: AvatarGroupClassKey;
  MuiPagination: PaginationClassKey;
  MuiPaginationItem: PaginationItemClassKey;
  MuiSpeedDial: SpeedDialClassKey;
  MuiSpeedDialAction: SpeedDialActionClassKey;
  MuiSpeedDialIcon: SpeedDialIconClassKey;
  MuiTabList: TabListClassKey;
  MuiTabPanel: TabPanelClassKey;
  MuiTimeline: TimelineClassKey;
  MuiTimelineConnector: TimelineConnectorClassKey;
  MuiTimelineContent: TimelineContentClassKey;
  MuiTimelineDot: TimelineDotClassKey;
  MuiTimelineItem: TimelineItemClassKey;
  MuiTimelineOppositeContent: TimelineOppositeContentClassKey;
  MuiTimelineSeparator: TimelineSeparatorClassKey;
  MuiToggleButton: ToggleButtonClassKey;
  MuiToggleButtonGroup: ToggleButtonGroupClassKey;
  MuiTreeItem: TreeItemClassKey;
  MuiTreeView: TreeViewClassKey;
}

declare module '@material-ui/core/styles/overrides' {
  interface ComponentNameToClassKey extends LabComponentNameToClassKey {}
}

// disable automatic export
export {};
