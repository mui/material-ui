fn({
  MuiBackdrop: {
    defaultProps: {
      slots: {
        transition: CustomTransition
      },

      TransitionProps: { unmountOnExit: true }
    },
  },
});
