fn({
  MuiDialog: {
    defaultProps: {
      slots: {
        transition: CustomTransition,
        paper: CustomPaper,
      },

      slotProps: {
        transition: { unmountOnExit: true },
        paper: { className: 'paper' },
      },
    },
  },
});
