fn({
  MuiListItem: {
    defaultProps: {
      components: { Root: ComponentsRoot },
      componentsProps: { root: componentsRootProps },
    },
  },
});

fn({
  MuiListItem: {
    defaultProps: {
      components: { Root: ComponentsRoot },
      slotProps: { root: slotsRootProps },
    },
  },
});

fn({
  MuiListItem: {
    defaultProps: {
      slots: { root: SlotsRoot },
      componentsProps: { root: componentsRootProps },
    },
  },
});

fn({
  MuiListItem: {
    defaultProps: {
      slots: { root: SlotsRoot },
      components: { Root: ComponentsRoot },
      slotProps: { root: slotsRootProps },
      componentsProps: { root: componentsRootProps },
    },
  },
});
