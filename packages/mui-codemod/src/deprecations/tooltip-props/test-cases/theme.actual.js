fn({
  MuiTooltip: {
    defaultProps: {
      PopperComponent: CustomPopper,
      TransitionComponent: CustomTransition,
      PopperProps: { disablePortal: true },
      TransitionProps: { timeout: 200 },
    },
  },
});

fn({
  MuiTooltip: {
    defaultProps: {
      PopperComponent: CustomPopper,
      TransitionComponent: CustomTransition,
      PopperProps: { disablePortal: true },
      TransitionProps: { timeout: 200 },
      slotProps: {
        tooltip: { height: 20 }
      },
      slots: {
        tooltip: "div",
      },
    },
  },
});
