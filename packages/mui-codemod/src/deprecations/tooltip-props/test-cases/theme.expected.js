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
