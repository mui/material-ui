import { Badge } from '@mui/material';

<Badge
  slots={{
    root: ComponentsRoot,
  }}
  slotProps={{ root: componentsProps }}
/>;

<Badge
  slots={{ root: SlotsRoot, badge: SlotsBadge }}
  slotProps={{
    root: {
      ...slotsRootProps,
      ...slotsRootProps,
    },
    badge: {
      ...slotsBadgeProps,
      ...slotsBadgeProps,
    },
  }}
/>;

<Badge
  slots={{ root: SlotsRoot, badge: SlotsBadge }}
  slotsProps={{ root: slotsRootProps, badge: slotsBadgeProps }}
  slotProps={{ root: slotsRootProps, badge: slotsBadgeProps }}
/>;
