fn({
  MuiDialog: {
    defaultProps: {
      className: 'root',

      slots: {
        transition: CustomTransition,
        paper: CustomPaper
      },

      slotProps: {
        transition: { unmountOnExit: true },
        paper: { className: 'paper' }
      }
    },
  },
});

fn({
  MuiDialog: {
    defaultProps: {
      className: 'root',

      slots: {
        transition: CustomTransition
      },

      slotProps: {
        transition: { unmountOnExit: true }
      }
    },
  },
});

fn({
  MuiDialog: {
    defaultProps: {
      className: 'root',

      slots: {
        paper: CustomPaper
      },

      slotProps: {
        paper: { className: 'paper' }
      }
    },
  },
});
