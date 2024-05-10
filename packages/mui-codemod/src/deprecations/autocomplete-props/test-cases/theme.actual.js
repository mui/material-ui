fn({
  MuiAutocomplete: {
    defaultProps: {
      ChipProps: { height: 10 },
      PaperComponent: CustomPaper,
      PopperComponent: CustomPopper,
      ListboxComponent: CustomListbox,
      ListboxProps: { height: 12 },
    },
  },
});

fn({
  MuiAutocomplete: {
    defaultProps: {
      ChipProps: { height: 10 },
      PaperComponent: CustomPaper,
      PopperComponent: CustomPopper,
      ListboxComponent: CustomListbox,
      ListboxProps: { height: 12 },
      slotProps: {
        popupIndicator: { width: 20 }
      },
    },
  },
});
