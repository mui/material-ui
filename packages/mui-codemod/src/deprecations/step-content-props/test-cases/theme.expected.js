fn({
  MuiStepContent: {
    defaultProps: {
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
  MuiStepContent: {
    defaultProps: {
      slots: { transition: SlotTransition }
    },
  },
});

fn({
  MuiStepContent: {
    defaultProps: {
      slotProps: { transition: {
        ...{ unmountOnExit: true },
        ...{ id: 'test' }
      } }
    },
  },
});
