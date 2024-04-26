fn({
  MuiBackdrop: {
    defaultProps: {
      slots: {
        transition: CustomTransition
      }
    },
  },
});

fn({
  MuiBackdrop: {
    defaultProps: {
      slots: {
        root: 'div',
        transition: CustomTransition
      }
    },
  },
});

fn({
  MuiBackdrop: {
    defaultProps: {
      slots: {
        root: 'div',
        transition: SlotTransition
      }
    },
  },
});
