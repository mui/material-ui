fn({
  MuiListItem: {
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
  MuiListItem: {
    defaultProps: {
      slotProps: { root: slotsRootProps },

      slots: {
        root: ComponentsRoot
      }
    },
  },
});

fn({
  MuiListItem: {
    defaultProps: {
      slots: { root: SlotsRoot },

      slotProps: {
        root: componentsRootProps
      }
    },
  },
});

fn({
  MuiListItem: {
    defaultProps: {
      slots: {
        root: SlotsRoot
      },

      slotProps: {
        root: {
          ...componentsRootProps,
          ...slotsRootProps
        }
      }
    },
  },
});
