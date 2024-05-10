fn({
  MuiSpeedDial: {
    defaultProps: {
      slots: {
        transition: CustomTransition
      },

      slotProps: {
        transition: CustomTransitionProps
      }
    },
  },
});

fn({
  MuiSpeedDial: {
    defaultProps: {
      slots: {
        root: 'div',
        transition: CustomTransition
      },

      slotProps: {
        transition: CustomTransitionProps
      }
    },
  },
});

fn({
  MuiSpeedDial: {
    defaultProps: {
      slots: {
        root: 'div',
        transition: SlotTransition,
      },

      slotProps: {
        transition: CustomTransitionProps
      }
    },
  },
});
