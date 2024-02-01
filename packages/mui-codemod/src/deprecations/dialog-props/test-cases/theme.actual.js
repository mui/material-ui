fn({
  MuiDialog: {
    defaultProps: {
      className: 'root',
      TransitionComponent: CustomTransition,
      TransitionProps: { unmountOnExit: true },
      PaperComponent: CustomPaper,
      PaperProps: { className: 'paper' },
      transitionDuration: 1000,
    },
  },
});

fn({
  MuiDialog: {
    defaultProps: {
      className: 'root',
      transitionDuration: 1000,
    },
  },
});

fn({
  MuiDialog: {
    defaultProps: {
      className: 'root',
      TransitionComponent: CustomTransition,
      TransitionProps: { unmountOnExit: true },
      transitionDuration: 1000,
    },
  },
});

fn({
  MuiDialog: {
    defaultProps: {
      className: 'root',
      PaperComponent: CustomPaper,
      PaperProps: { className: 'paper' },
      transitionDuration: 1000,
    },
  },
});
