fn({
  MuiAutocomplete: {
    defaultProps: {
      slots: {
        paper: CustomPaper,
        popper: CustomPopper
      },

      slotProps: {
        clearIndicator: { width: 10 },
        paper: { width: 12 },
        popper: { width: 14 },
        popupIndicator: { width: 16 },
        chip: { height: 10 },

        listbox: {
          component: CustomListbox,
          ...{ height: 12 }
        }
      }
    },
  },
});

fn({
  MuiAutocomplete: {
    defaultProps: {
      slotProps: {
        clearIndicator: { width: 10 },
        paper: { width: 12 },
        popper: { width: 14 },

        popupIndicator: {
          ...{ width: 16 },
          ...{ width: 20 }
        },

        chip: { height: 10 },

        listbox: {
          component: CustomListbox,
          ...{ height: 12 }
        }
      },

      slots: {
        paper: CustomPaper,
        popper: CustomPopper
      }
    },
  },
});
