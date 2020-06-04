import { AlertClassKey } from '../Alert';
import { AlertTitleClassKey } from '../AlertTitle';
import { AutocompleteClassKey } from '../Autocomplete';
import { AvatarGroupClassKey } from '../AvatarGroup';
import { PaginationClassKey } from '../Pagination';
import { PaginationItemClassKey } from '../PaginationItem';
import { RatingClassKey } from '../Rating';
import { SkeletonClassKey } from '../Skeleton';
import { SpeedDialClassKey } from '../SpeedDial';
import { SpeedDialActionClassKey } from '../SpeedDialAction';
import { SpeedDialIconClassKey } from '../SpeedDialIcon';
import { TabListClassKey } from '../TabList';
import { TabPanelClassKey } from '../TabPanel';
import { ToggleButtonClassKey } from '../ToggleButton';
import { ToggleButtonGroupClassKey } from '../ToggleButtonGroup';
import { TreeItemClassKey } from '../TreeItem';
import { TreeViewClassKey } from '../TreeView';

export interface LabComponentNameToClassKey {
  MuiAlert: AlertClassKey;
  MuiAlertTitle: AlertTitleClassKey;
  MuiAutocomplete: AutocompleteClassKey;
  MuiAvatarGroup: AvatarGroupClassKey;
  MuiPagination: PaginationClassKey;
  MuiPaginationItem: PaginationItemClassKey;
  MuiRating: RatingClassKey;
  MuiSkeleton: SkeletonClassKey;
  MuiSpeedDial: SpeedDialClassKey;
  MuiSpeedDialAction: SpeedDialActionClassKey;
  MuiSpeedDialIcon: SpeedDialIconClassKey;
  MuiTabList: TabListClassKey;
  MuiTabPanel: TabPanelClassKey;
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
