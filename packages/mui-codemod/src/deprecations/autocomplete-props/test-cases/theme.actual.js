fn({
  MuiAutocomplete: {
    defaultProps: {
      ChipProps: { height: 10 },
      PaperComponent: CustomPaper,
      PopperComponent: CustomPopper,
      ListboxComponent: CustomListbox,
      ListboxProps: { height: 12 },
      componentsProps: {
        clearIndicator: { width: 10 },
        paper: { width: 12 },
        popper: { width: 14 },
        popupIndicator: { width: 16 },
      }
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
      componentsProps: {
        clearIndicator: { width: 10 },
        paper: { width: 12 },
        popper: { width: 14 },
        popupIndicator: { width: 16 },
      }
    },
  },
});
