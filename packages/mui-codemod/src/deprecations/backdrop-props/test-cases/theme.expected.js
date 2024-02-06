fn({
  MuiBackdrop: {
    defaultProps: {
      slots: {
        transition: CustomTransition
      },

      slotProps: {
        transition: { unmountOnExit: true }
      }
    },
  },
});
