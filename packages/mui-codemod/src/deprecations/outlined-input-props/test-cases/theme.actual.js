fn({
  MuiOutlinedInput: {
    defaultProps: {
      components: { Input: ComponentsInput },
      componentsProps: { input: componentsInputProps },
    },
  },
});

fn({
  MuiOutlinedInput: {
    defaultProps: {
      components: { Input: ComponentsInput },
      slots: { root: SlotsRoot },
      componentsProps: { input: componentsInputProps },
      slotProps: { root: slotsRootProps },
    },
  },
});

fn({
  MuiOutlinedInput: {
    defaultProps: {
      components: { Input: ComponentsInput },
      slots: { root: SlotsRoot, input: SlotsInput },
      componentsProps: { input: componentsInputProps },
      slotProps: { root: slotsRootProps, input: slotsInputProps },
    },
  },
});

fn({
  MuiOutlinedInput: {
    defaultProps: {
      components: { Input: ComponentsInput },
      slots: { root: SlotsRoot, input: SlotsInput },
      componentsProps: { input: componentsInputProps, root: componentsRootProps },
      slotProps: { root: slotsRootProps, input: slotsInputProps },
    },
  },
});
