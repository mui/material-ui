fn({
  MuiDialog: {
    defaultProps: {
      className: 'root',

      slots: {
        transition: CustomTransition,
        paper: CustomPaper
      },

      slotProps: {
        transition: {
          timeout: 1000,
          unmountOnExit: true
        },

        paper: { className: 'paper' }
      }
    },
  },
});

fn({
  MuiDialog: {
    defaultProps: {
      className: 'root',

      slotProps: {
        transition: {
          timeout: 1000
        }
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
        transition: {
          timeout: 1000,
          unmountOnExit: true
        }
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
        transition: {
          timeout: 1000
        },

        paper: { className: 'paper' }
      }
    },
  },
});
