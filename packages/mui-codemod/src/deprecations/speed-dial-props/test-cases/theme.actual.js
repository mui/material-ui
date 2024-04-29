fn({
  MuiSpeedDial: {
    defaultProps: {
      TransitionComponent: CustomTransition,
      TransitionComponentProps: CustomTransitionProps,
    },
  },
});

fn({
  MuiSpeedDial: {
    defaultProps: {
      TransitionComponent: CustomTransition,
      TransitionComponentProps: CustomTransitionProps,
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
      TransitionComponentProps: CustomTransitionProps,
      slots: {
        root: 'div',
        transition: SlotTransition,
      },
    },
  },
});
