fn({
  MuiDialog: {
    defaultProps: {
      className: 'root',
      TransitionComponent: CustomTransition,
      TransitionProps: { unmountOnExit: true },
      PaperComponent: CustomPaper,
      PaperProps: { className: 'paper' },
    },
  },
});

fn({
  MuiDialog: {
    defaultProps: {
      className: 'root',
      TransitionComponent: CustomTransition,
      TransitionProps: { unmountOnExit: true },
    },
  },
});

fn({
  MuiDialog: {
    defaultProps: {
      className: 'root',
      PaperComponent: CustomPaper,
      PaperProps: { className: 'paper' },
    },
  },
});
