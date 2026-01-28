fn({
  MuiDialog: {
    defaultProps: {
      slots: {
        transition: CustomTransition
      },

      slotProps: {
        transition: CustomTransitionProps,
        paper: PaperProps
      }
    },
  },
});

fn({
  MuiDialog: {
    defaultProps: {
      slots: {
        root: 'div',
        transition: CustomTransition
      },

      slotProps: {
        transition: CustomTransitionProps,
        paper: PaperProps
      }
    },
  },
});

fn({
  MuiDialog: {
    defaultProps: {
      slots: {
        root: 'div',
        transition: SlotTransition,
      },

      slotProps: {
        transition: CustomTransitionProps,
        paper: PaperProps
      }
    },
  },
});
