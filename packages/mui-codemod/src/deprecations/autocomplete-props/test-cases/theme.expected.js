fn({
  MuiAutocomplete: {
    defaultProps: {
      slots: {
        paper: CustomPaper,
        popper: CustomPopper,
        listbox: CustomListbox
      },

      slotProps: {
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
        popupIndicator: { width: 20 },
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
