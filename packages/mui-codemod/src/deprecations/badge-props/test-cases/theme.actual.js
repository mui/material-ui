fn({
  MuiBadge: {
    defaultProps: {
      components: { root: ComponentsRoot },
      componentsProps: { root: componentsRootProps },
    },
  },
});

fn({
  MuiBadge: {
    defaultProps: {
      components: { root: ComponentsRoot },
      slots: { badge: SlotsBadge },
      componentsProps: { root: componentsRootProps },
      slotProps: { badge: slotsBadgeProps },
    },
  },
});

fn({
  MuiBadge: {
    defaultProps: {
      components: { root: ComponentsRoot },
      slots: { badge: SlotsBadge, root: SlotsRoot },
      componentsProps: { root: componentsRootProps },
      slotProps: { root: slotsRootProps, badge: slotsBadgeProps },
    },
  },
});

fn({
  MuiBadge: {
    defaultProps: {
      components: { root: ComponentsRoot },
      slots: { badge: SlotsBadge, root: SlotsRoot },
      componentsProps: { root: componentsRootProps, badge: componentsBadgeProps },
      slotProps: { badge: slotsBadgeProps, root: slotsRootProps },
    },
  },
});

