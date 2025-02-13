fn({
  MuiInputBase: {
    defaultProps: {
      components: { Input: ComponentsInput },
      componentsProps: { input: componentsInputProps },
    },
  },
});

fn({
  MuiInputBase: {
    defaultProps: {
      components: { Input: ComponentsInput },
      slots: { root: SlotsRoot },
      componentsProps: { input: componentsInputProps },
      slotProps: { root: slotsRootProps },
    },
  },
});

fn({
  MuiInputBase: {
    defaultProps: {
      components: { Input: ComponentsInput },
      slots: { root: SlotsRoot, input: SlotsInput },
      componentsProps: { input: componentsInputProps },
      slotProps: { root: slotsRootProps, input: slotsInputProps },
    },
  },
});

fn({
  MuiInputBase: {
    defaultProps: {
      components: { Input: ComponentsInput },
      slots: { root: SlotsRoot, input: SlotsInput },
      componentsProps: { input: componentsInputProps, root: componentsRootProps },
      slotProps: { root: slotsRootProps, input: slotsInputProps },
    },
  },
});
