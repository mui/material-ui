fn({
  MuiSnackbar: {
    defaultProps: {
      slots: {
        transition: CustomTransition,
      },
      slotProps: {
        clickAwayListener: CustomListenerProps,
        content: CustomContentProps,
        transition: CustomTransitionProps,
      },
    },
  },
});

fn({
  MuiSnackbar: {
    defaultProps: {
      slots: {
        root: 'div',
        transition: CustomTransition,
      },
      slotProps: {
        clickAwayListener: CustomListenerProps,
        content: CustomContentProps,
        transition: CustomTransitionProps,
      },
    },
  },
});

fn({
  MuiSnackbar: {
    defaultProps: {
      slots: {
        root: 'div',
        transition: SlotTransition,
      },
      slotProps: {
        clickAwayListener: CustomListenerProps,
        content: CustomContentProps,
        transition: CustomTransitionProps,
      },
    },
  },
});
