fn({
  MuiBadge: {
    defaultProps: {
      slots: {
        root: ComponentsRoot,
      },
      slotProps: {
        root: componentsRootProps,
      },
    },
  },
});

fn({
  MuiBadge: {
    defaultProps: {
      slots: {
        root: ComponentsRoot,
        badge: SlotsBadge,
      },

      slotProps: {
        root: componentsRootProps,
        badge: slotsBadgeProps,
      },
    },
  },
});

fn({
  Muibadge: {
    defaultProps: {
      slots: {
        root: SlotsRoot,
        badge: SlotsBadge,
      },

      slotProps: {
        root: slotsRootProps,
        badge: slotsbadgeProps,
      },
    },
  },
});
