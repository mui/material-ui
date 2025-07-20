fn({
  MuiStepContent: {
    defaultProps: {
      TransitionComponent: CustomTransition,
      TransitionProps: { unmountOnExit: true },
    },
  },
});

fn({
  MuiStepContent: {
    defaultProps: {
      TransitionComponent: ComponentTransition,
      slots: { transition: SlotTransition },
    },
  },
});

fn({
  MuiStepContent: {
    defaultProps: {
      slotProps: { transition: { id: 'test' } },
      TransitionProps: { unmountOnExit: true },
    },
  },
});
