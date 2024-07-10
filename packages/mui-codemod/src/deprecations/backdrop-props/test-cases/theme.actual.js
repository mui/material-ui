fn({
  MuiBackdrop: {
    defaultProps: {
      components: { Root: ComponentsRoot },
      componentsProps: { root: componentsRootProps },
    },
  },
});

fn({
  MuiBackdrop: {
    defaultProps: {
      components: { Root: ComponentsRoot },
      slotProps: { root: slotsRootProps },
    },
  },
});

fn({
  MuiBackdrop: {
    defaultProps: {
      slots: { root: SlotsRoot },
      componentsProps: { root: componentsRootProps },
    },
  },
});

fn({
  MuiBackdrop: {
    defaultProps: {
      slots: { root: SlotsRoot },
      components: { Root: ComponentsRoot },
      slotProps: { root: slotsRootProps },
      componentsProps: { root: componentsRootProps },
    },
  },
});
