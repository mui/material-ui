fn({
  MuiMenu: {
    defaultProps: {
      MenuListProps: { disablePadding: true },
      TransitionComponent: CustomTransition,
      TransitionProps: { timeout: 200 },
    },
  },
});

fn({
  MuiMenu: {
    defaultProps: {
      TransitionComponent: CustomTransition,
      MenuListProps: { disablePadding: true },
      TransitionProps: { timeout: 200 },
      slotProps: {
        root: { disablePortal: true },
      },
    },
  },
});
