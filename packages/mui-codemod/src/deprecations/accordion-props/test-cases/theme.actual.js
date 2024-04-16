fn({
  MuiAccordion: {
    defaultProps: {
      TransitionComponent: CustomTransition,
      TransitionProps: { unmountOnExit: true },
    },
  },
});

fn({
  MuiAccordion: {
    defaultProps: {
      TransitionComponent: ComponentTransition,
      slots: { transition: SlotTransition },
    },
  },
});

fn({
  MuiAccordion: {
    defaultProps: {
      slotProps: { transition: { id: 'test' } },
      TransitionProps: { unmountOnExit: true },
    },
  },
});
