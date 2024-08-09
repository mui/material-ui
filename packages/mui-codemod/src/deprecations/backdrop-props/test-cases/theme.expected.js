fn({
  MuiBackdrop: {
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
  MuiBackdrop: {
    defaultProps: {
      slotProps: { root: slotsRootProps },

      slots: {
        root: ComponentsRoot
      }
    },
  },
});

fn({
  MuiBackdrop: {
    defaultProps: {
      slots: { root: SlotsRoot },

      slotProps: {
        root: componentsRootProps
      }
    },
  },
});

fn({
  MuiBackdrop: {
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
