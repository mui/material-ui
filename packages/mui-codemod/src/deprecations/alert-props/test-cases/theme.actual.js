fn({
  MuiAlert: {
    defaultProps: {
      components: { CloseButton: ComponentsButton },
      componentsProps: { closeButton: componentsButtonProps },
    },
  },
});

fn({
  MuiAlert: {
    defaultProps: {
      components: { CloseButton: ComponentsButton },
      slots: { closeIcon: SlotsIcon },
      componentsProps: { closeButton: componentsButtonProps },
      slotProps: { closeIcon: slotsIconProps },
    },
  },
});

fn({
  MuiAlert: {
    defaultProps: {
      components: { CloseButton: ComponentsButton },
      slots: { closeIcon: SlotsIcon, closeButton: SlotsButton },
      componentsProps: { closeButton: componentsButtonProps },
      slotProps: { closeIcon: slotsIconProps, closeButton: slotsButtonProps },
    },
  },
});

fn({
  MuiAlert: {
    defaultProps: {
      components: { CloseButton: ComponentsButton },
      slots: { closeIcon: SlotsIcon, closeButton: SlotsButton },
      componentsProps: { closeButton: componentsButtonProps, closeIcon: componentsIconProps },
      slotProps: { closeIcon: slotsIconProps, closeButton: slotsButtonProps },
    },
  },
});
