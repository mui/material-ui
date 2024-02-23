import { Badge } from '@mui/material';

<Badge
  slots={{
    root: ComponentsRoot,
  }}
  slotProps={{ root: componentsRootProps }}
/>;

<Badge
  slots={{
    root: SlotsRoot,
    badge: ComponentsBadge,
  }}
  slotProps={{
    root: slotsRootProps,
    badge: componentsBadgeProps,
  }}
/>;

<Badge
  slots={{ root: SlotsRoot, badge: SlotsBadge }}
  slotProps={{ root: slotsRootProps, badge: slotsBadgeProps }}
/>;
