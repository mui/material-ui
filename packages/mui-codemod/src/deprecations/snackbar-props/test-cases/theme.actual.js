fn({
  MuiSnackbar: {
    defaultProps: {
      ClickAwayListenerProps: CustomListenerProps,
      ContentProps: CustomContentProps,
      TransitionComponent: CustomTransition,
      TransitionProps: CustomTransitionProps,
    },
  },
});

fn({
  MuiSnackbar: {
    defaultProps: {
      ClickAwayListenerProps: CustomListenerProps,
      ContentProps: CustomContentProps,
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
      ClickAwayListenerProps: CustomListenerProps,
      ContentProps: CustomContentProps,
      TransitionComponent: ComponentTransition,
      TransitionProps: CustomTransitionProps,
      slots: {
        root: 'div',
        transition: SlotTransition,
      },
    },
  },
});
