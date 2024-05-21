fn({
  MuiSnackbar: {
    defaultProps: {
      TransitionComponent: CustomTransition,
      TransitionProps: CustomTransitionProps,
    },
  },
});

fn({
  MuiSnackbar: {
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
  MuiSnackbar: {
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
