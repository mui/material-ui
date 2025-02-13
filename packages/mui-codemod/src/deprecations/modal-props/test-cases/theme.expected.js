fn({
  MuiModal: {
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
  MuiModal: {
    defaultProps: {
      slotProps: { root: slotsRootProps },

      slots: {
        root: ComponentsRoot
      }
    },
  },
});

fn({
  MuiModal: {
    defaultProps: {
      slots: { root: SlotsRoot },

      slotProps: {
        root: componentsRootProps
      }
    },
  },
});

fn({
  MuiModal: {
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

fn({
  MuiModal: {
    defaultProps: {
      slots: {
        backdrop: Backdrop
      },

      slotProps: {
        backdrop: {
          timeout: 500,
        }
      }
    },
  },
});
