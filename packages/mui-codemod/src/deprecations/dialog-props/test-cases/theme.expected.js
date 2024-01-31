fn({
  MuiDialog: {
    defaultProps: {
      slots: {
        transition: CustomTransition,
      },

      slotProps: {
        transition: { unmountOnExit: true },
      },
    },
  },
});
