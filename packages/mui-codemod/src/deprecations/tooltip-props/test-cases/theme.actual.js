fn({
  MuiTooltip: {
    defaultProps: {
      components: { Arrow: ComponentsArrow },
      componentsProps: { arrow: componentsArrowProps },
    },
  },
});

fn({
  MuiTooltip: {
    defaultProps: {
      components: { Arrow: ComponentsArrow },
      slots: { tooltip: SlotsTooltip },
      componentsProps: { arrow: componentsArrowProps },
      slotProps: { tooltip: slotsTooltipProps },
    },
  },
});

fn({
  MuiTooltip: {
    defaultProps: {
      components: { Arrow: ComponentsArrow },
      slots: { tooltip: SlotsTooltip, arrow: SlotsArrow },
      componentsProps: { arrow: componentsArrowProps },
      slotProps: { tooltip: slotsTooltipProps, arrow: slotsArrowProps },
    },
  },
});

fn({
  MuiTooltip: {
    defaultProps: {
      components: { Arrow: ComponentsArrow },
      slots: { tooltip: SlotsTooltip, arrow: SlotsArrow },
      componentsProps: { arrow: componentsArrowProps, tooltip: componentsTooltipProps },
      slotProps: { tooltip: slotsTooltipProps, arrow: slotsArrowProps },
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
