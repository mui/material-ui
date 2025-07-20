fn({
  MuiTooltip: {
    defaultProps: {
      slots: {
        arrow: ComponentsArrow
      },

      slotProps: {
        arrow: componentsArrowProps
      }
    },
  },
});

fn({
  MuiTooltip: {
    defaultProps: {
      slots: {
        arrow: ComponentsArrow,
        tooltip: SlotsTooltip
      },

      slotProps: {
        arrow: componentsArrowProps,
        tooltip: slotsTooltipProps
      }
    },
  },
});

fn({
  MuiTooltip: {
    defaultProps: {
      slots: {
        arrow: SlotsArrow,
        tooltip: SlotsTooltip
      },

      slotProps: {
        arrow: {
          ...componentsArrowProps,
          ...slotsArrowProps
        },

        tooltip: slotsTooltipProps
      }
    },
  },
});

fn({
  MuiTooltip: {
    defaultProps: {
      slots: {
        arrow: SlotsArrow,
        tooltip: SlotsTooltip
      },

      slotProps: {
        arrow: {
          ...componentsArrowProps,
          ...slotsArrowProps
        },

        tooltip: {
          ...componentsTooltipProps,
          ...slotsTooltipProps
        }
      }
    },
  },
});
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
