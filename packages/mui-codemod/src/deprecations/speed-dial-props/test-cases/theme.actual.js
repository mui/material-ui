fn({
  MuiSpeedDial: {
    defaultProps: {
      TransitionComponent: CustomTransition,
      TransitionProps: CustomTransitionProps,
    },
  },
});

fn({
  MuiSpeedDial: {
    defaultProps: {
      TransitionComponent: CustomTransition,
      TransitionProps: CustomTransitionProps,
      slots: {
        root: 'div',
      },
    },
  },
});

fn({
  MuiSpeedDial: {
    defaultProps: {
      TransitionComponent: ComponentTransition,
      TransitionProps: CustomTransitionProps,
      slots: {
        root: 'div',
        transition: SlotTransition,
      },
    },
  },
});
