fn({
  MuiFilledInput: {
    defaultProps: {
      components: { Input: ComponentsInput },
      componentsProps: { input: componentsInputProps },
    },
  },
});

fn({
  MuiFilledInput: {
    defaultProps: {
      components: { Input: ComponentsInput },
      slots: { root: SlotsRoot },
      componentsProps: { input: componentsInputProps },
      slotProps: { root: slotsRootProps },
    },
  },
});

fn({
  MuiFilledInput: {
    defaultProps: {
      components: { Input: ComponentsInput },
      slots: { root: SlotsRoot, input: SlotsInput },
      componentsProps: { input: componentsInputProps },
      slotProps: { root: slotsRootProps, input: slotsInputProps },
    },
  },
});

fn({
  MuiFilledInput: {
    defaultProps: {
      components: { Input: ComponentsInput },
      slots: { root: SlotsRoot, input: SlotsInput },
      componentsProps: { input: componentsInputProps, root: componentsRootProps },
      slotProps: { root: slotsRootProps, input: slotsInputProps },
    },
  },
});
