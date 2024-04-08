fn({
  MuiBadge: {
    defaultProps: {
      slots: {
        root: ComponentsRoot
      },

      slotProps: {
        root: componentsRootProps
      }
    },
  },
});

fn({
  MuiBadge: {
    defaultProps: {
      slots: {
        root: ComponentsRoot,
        badge: SlotsBadge
      },

      slotProps: {
        root: componentsRootProps,
        badge: slotsBadgeProps
      }
    },
  },
});

fn({
  MuiBadge: {
    defaultProps: {
      slots: {
        root: SlotsRoot,
        badge: SlotsBadge
      },

      slotProps: {
        root: {
          ...componentsRootProps,
          ...slotsRootProps
        },

        badge: slotsBadgeProps
      }
    },
  },
});

fn({
  MuiBadge: {
    defaultProps: {
      slots: {
        root: SlotsRoot,
        badge: SlotsBadge
      },

      slotProps: {
        root: {
          ...componentsRootProps,
          ...slotsRootProps
        },

        badge: {
          ...componentsBadgeProps,
          ...slotsBadgeProps
        }
      }
    },
  },
});

