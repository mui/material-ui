fn({
  MuiMenu: {
    defaultProps: {
      slotProps: {
        list: { disablePadding: true },
        transition: { timeout: 200 }
      },

      slots: {
        transition: CustomTransition
      }
    },
  },
});

fn({
  MuiMenu: {
    defaultProps: {
      slotProps: {
        root: { disablePortal: true },
        list: { disablePadding: true },
        transition: { timeout: 200 }
      },

      slots: {
        transition: CustomTransition
      }
    },
  },
});
