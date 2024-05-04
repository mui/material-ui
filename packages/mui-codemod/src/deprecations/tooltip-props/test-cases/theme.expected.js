fn({
  MuiTooltip: {
    defaultProps: {
      slots: {
        popper: CustomPopper,
        transition: CustomTransition
      },

      slotProps: {
        popper: { disablePortal: true },
        transition: { timeout: 200 }
      }
    },
  },
});

fn({
  MuiTooltip: {
    defaultProps: {
      slotProps: {
        tooltip: { height: 20 },
        popper: { disablePortal: true },
        transition: { timeout: 200 }
      },

      slots: {
        tooltip: "div",
        popper: CustomPopper,
        transition: CustomTransition
      }
    },
  },
});
