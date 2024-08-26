fn({
  MuiFormControlLabel: {
    defaultProps: {
      slotProps: {
        typography: componentsTypographyProps
      }
    },
  },
});

fn({
  MuiFormControlLabel: {
    defaultProps: {
      slotProps: {
        typography: {
          ...componentsTypographyProps,
          ...slotsTypographyProps
        }
      }
    },
  },
});
