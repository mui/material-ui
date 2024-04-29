fn({
  MuiSpeedDial: {
    defaultProps: {
      TransitionComponentProps: CustomTransitionProps,

      slots: {
        transition: CustomTransition
      }
    },
  },
});

fn({
  MuiSpeedDial: {
    defaultProps: {
      TransitionComponentProps: CustomTransitionProps,

      slots: {
        root: 'div',
        transition: CustomTransition
      }
    },
  },
});

fn({
  MuiSpeedDial: {
    defaultProps: {
      TransitionComponentProps: CustomTransitionProps,

      slots: {
        root: 'div',
        transition: SlotTransition,
      }
    },
  },
});
