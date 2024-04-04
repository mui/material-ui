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
