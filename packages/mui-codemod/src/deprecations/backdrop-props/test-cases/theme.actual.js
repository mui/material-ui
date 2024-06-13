fn({
  MuiBackdrop: {
    defaultProps: {
      TransitionComponent: CustomTransition,
    },
  },
});

fn({
  MuiBackdrop: {
    defaultProps: {
      TransitionComponent: CustomTransition,
      slots: {
        root: 'div',
      },
    },
  },
});

fn({
  MuiBackdrop: {
    defaultProps: {
      TransitionComponent: ComponentTransition,
      slots: {
        root: 'div',
        transition: SlotTransition
      },
    },
  },
});

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
