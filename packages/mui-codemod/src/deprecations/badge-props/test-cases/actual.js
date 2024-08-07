import { Badge } from '@mui/material';

<Badge components={{ root: ComponentsRoot }} componentsProps={{ root: componentsRootProps }} />;

<Badge
  slots={{ badge: SlotsBadge }}
  components={{ root: ComponentsRoot }}
  slotProps={{ badge: slotsBadgeProps }}
  componentsProps={{ root: componentsRootProps }}
/>;

<Badge
  slots={{ root: SlotsRoot, badge: SlotsBadge }}
  components={{ root: ComponentsRoot }}
  slotProps={{ root: slotsRootProps, badge: slotsBadgeProps }}
  componentsProps={{ root: componentsRootProps }}
/>;

<Badge
  slots={{ root: SlotsRoot, badge: SlotsBadge }}
  components={{ root: ComponentsRoot }}
  slotProps={{ root: slotsRootProps, badge: slotsBadgeProps }}
  componentsProps={{ root: componentsRootProps, badge: componentsBadgeProps }}
/>;
