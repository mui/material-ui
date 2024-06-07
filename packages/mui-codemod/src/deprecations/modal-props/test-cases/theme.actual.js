fn({
  MuiModal: {
    defaultProps: {
      components: { Root: ComponentsRoot },
      componentsProps: { root: componentsRootProps },
    },
  },
});

fn({
  MuiModal: {
    defaultProps: {
      components: { Root: ComponentsRoot },
      slotProps: { root: slotsRootProps },
    },
  },
});

fn({
  MuiModal: {
    defaultProps: {
      slots: { root: SlotsRoot },
      componentsProps: { root: componentsRootProps },
    },
  },
});

fn({
  MuiModal: {
    defaultProps: {
      slots: { root: SlotsRoot },
      components: { Root: ComponentsRoot },
      slotProps: { root: slotsRootProps },
      componentsProps: { root: componentsRootProps },
    },
  },
});
