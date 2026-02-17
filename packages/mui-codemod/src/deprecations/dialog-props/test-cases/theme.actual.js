fn({
  MuiDialog: {
    defaultProps: {
      TransitionComponent: CustomTransition,
      TransitionProps: CustomTransitionProps,
      PaperProps: PaperProps,
    },
  },
});

fn({
  MuiDialog: {
    defaultProps: {
      TransitionComponent: CustomTransition,
      TransitionProps: CustomTransitionProps,
      slots: {
        root: 'div',
      },
      PaperProps: PaperProps,
    },
  },
});

fn({
  MuiDialog: {
    defaultProps: {
      TransitionComponent: ComponentTransition,
      TransitionProps: CustomTransitionProps,
      slots: {
        root: 'div',
        transition: SlotTransition,
      },
      PaperProps: PaperProps,
    },
  },
});
