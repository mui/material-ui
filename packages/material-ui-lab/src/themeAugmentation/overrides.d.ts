import { AvatarGroupClassKey } from '../AvatarGroup';
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
  MuiAvatarGroup: AvatarGroupClassKey;
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
