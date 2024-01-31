fn({
  MuiDialog: {
    defaultProps: {
      TransitionComponent: CustomTransition,
      TransitionProps: { unmountOnExit: true },
      PaperComponent: CustomPaper,
      PaperProps: { className: 'paper' },
    },
  },
});
