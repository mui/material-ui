fn({
  MuiAlert: {
    defaultProps: {
      slots: {
        closeButton: ComponentsButton,
      },

      slotProps: {
        closeButton: componentsButtonProps,
      },
    },
  },
});

fn({
  MuiAlert: {
    defaultProps: {
      slots: {
        closeButton: ComponentsButton,
        closeIcon: SlotsIcon,
      },

      slotProps: {
        closeButton: componentsButtonProps,
        closeIcon: slotsIconProps,
      },
    },
  },
});

fn({
  MuiAlert: {
    defaultProps: {
      slots: {
        closeButton: SlotsButton,
        closeIcon: SlotsIcon,
      },

      slotProps: {
        closeButton: slotsButtonProps,
        closeIcon: slotsIconProps,
      },
    },
  },
});
