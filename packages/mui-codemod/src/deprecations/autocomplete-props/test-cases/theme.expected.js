fn({
  MuiAutocomplete: {
    defaultProps: {
      slotProps: {
        clearIndicator: { width: 10 },
        paper: { width: 12 },
        popper: { width: 14 },
        popupIndicator: { width: 16 }
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
        }
      }
    },
  },
});
