import { AlertProps } from '../Alert';
import { AlertTitleProps } from '../AlertTitle';
import { AutocompleteProps } from '../Autocomplete';
import { AvatarGroupProps } from '../AvatarGroup';
import { PaginationProps } from '../Pagination';
import { PaginationItemProps } from '../PaginationItem';
import { RatingProps } from '../Rating';
import { SkeletonProps } from '../Skeleton';
import { SpeedDialProps } from '../SpeedDial';
import { SpeedDialActionProps } from '../SpeedDialAction';
import { SpeedDialIconProps } from '../SpeedDialIcon';
import { TabListProps } from '../TabList';
import { TabPanelProps } from '../TabPanel';
import { ToggleButtonProps } from '../ToggleButton';
import { ToggleButtonGroupProps } from '../ToggleButtonGroup';
import { TreeItemProps } from '../TreeItem';
import { TreeViewProps } from '../TreeView';

export interface LabComponentsPropsList {
  MuiAlert: AlertProps;
  MuiAlertTitle: AlertTitleProps;
  MuiAutocomplete: AutocompleteProps<any, any, any, any>;
  MuiAvatarGroup: AvatarGroupProps;
  MuiPagination: PaginationProps;
  MuiPaginationItem: PaginationItemProps;
  MuiRating: RatingProps;
  MuiSkeleton: SkeletonProps;
  MuiSpeedDial: SpeedDialProps;
  MuiSpeedDialAction: SpeedDialActionProps;
  MuiSpeedDialIcon: SpeedDialIconProps;
  MuiTabList: TabListProps;
  MuiTabPanel: TabPanelProps;
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
