fn({
  MuiMenu: {
    defaultProps: {
      MenuListProps: { disablePadding: true },
      TransitionProps: { timeout: 200 },
    },
  },
});

fn({
  MuiMenu: {
    defaultProps: {
      MenuListProps: { disablePadding: true },
      TransitionProps: { timeout: 200 },
      slotProps: {
        root: { disablePortal: true },
      },
    },
  },
});
