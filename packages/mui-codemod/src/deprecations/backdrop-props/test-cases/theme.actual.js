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
