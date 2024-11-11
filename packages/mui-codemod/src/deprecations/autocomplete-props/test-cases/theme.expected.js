fn({
  MuiAutocomplete: {
    defaultProps: {
      slots: {
        paper: CustomPaper,
        popper: CustomPopper,
        listbox: CustomListbox
      },

      slotProps: {
        clearIndicator: { width: 10 },
        paper: { width: 12 },
        popper: { width: 14 },
        popupIndicator: { width: 16 },
        listbox: { height: 12 },
        chip: { height: 10 }
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

        listbox: { height: 12 },
        chip: { height: 10 }
      },

      slots: {
        paper: CustomPaper,
        popper: CustomPopper,
        listbox: CustomListbox
      }
    },
  },
});
