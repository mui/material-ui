fn({
  MuiStepLabel: {
    defaultProps: {
      slotProps: {
        label: componentsLabelProps
      }
    },
  },
});

fn({
  MuiStepLabel: {
    defaultProps: {
      slotProps: {
        label: {
          ...componentsLabelProps,
          ...slotLabelProps
        }
      }
    },
  },
});
