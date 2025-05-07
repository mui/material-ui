fn({
  MuiPopper: {
    defaultProps: {
      components: { Root: ComponentsRoot },
      componentsProps: { root: componentsRootProps },
    },
  },
});

fn({
  MuiPopper: {
    defaultProps: {
      components: { Root: ComponentsRoot },
      slots: { root: SlotsRoot },
      componentsProps: { root: componentsRootProps },
      slotProps: { root: slotsRootProps },
    },
  },
});
