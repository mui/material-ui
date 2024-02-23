import { Badge } from '@mui/material';

<Badge components={{ root: ComponentsRoot }} componentsProps={{ root: componentsProps }} />;

<Badge
  slots={{ root: SlotsRoot, badge: SlotsBadge }}
  components={{ root: ComponentsRoot, badge: ComponentsBadge }}
  slotProps={{ root: slotsRootProps, badge: slotsBadgeProps }}
  componentsProps={{ root: slotsRootProps, badge: slotsBadgeProps }}
/>;

<Badge
  slots={{ root: SlotsRoot, badge: SlotsBadge }}
  components={{ root: ComponentsRoot, badge: ComponentsBadge }}
  slotsProps={{ root: slotsRootProps, badge: slotsBadgeProps }}
  componentsProps={{ root: slotsRootProps, badge: slotsBadgeProps }}
/>;
