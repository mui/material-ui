import { Badge } from '@mui/material';

<Badge slots={{
  root: ComponentsRoot
}} slotProps={{ root: componentsRootProps }} />;

<Badge
  slots={{
    badge: SlotsBadge,
    root: ComponentsRoot
  }}
  slotProps={{
    badge: slotsBadgeProps,
    root: componentsRootProps
  }} />;

<Badge
  slots={{ root: SlotsRoot, badge: SlotsBadge }}
  slotProps={{ badge: slotsBadgeProps, root: {
    ...componentsRootProps,
    ...slotsRootProps
  } }} />;

<Badge
  slots={{ root: SlotsRoot, badge: SlotsBadge }}
  slotProps={{ root: {
    ...componentsRootProps,
    ...slotsRootProps
  }, badge: {
    ...componentsBadgeProps,
    ...slotsBadgeProps
  } }} />;
