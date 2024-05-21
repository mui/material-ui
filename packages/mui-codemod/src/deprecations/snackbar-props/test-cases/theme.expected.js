fn({
  MuiSnackbar: {
    defaultProps: {
      slots: {
        transition: CustomTransition,
      },
      slotProps: {
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
        transition: CustomTransitionProps,
      },
    },
  },
});
