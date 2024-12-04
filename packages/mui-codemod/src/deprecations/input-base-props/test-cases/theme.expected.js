fn({
  MuiInputBase: {
    defaultProps: {
      slots: {
        input: ComponentsInput
      },

      slotProps: {
        input: componentsInputProps
      }
    },
  },
});

fn({
  MuiInputBase: {
    defaultProps: {
      slots: {
        input: ComponentsInput,
        root: SlotsRoot
      },

      slotProps: {
        input: componentsInputProps,
        root: slotsRootProps
      }
    },
  },
});

fn({
  MuiInputBase: {
    defaultProps: {
      slots: {
        input: SlotsInput,
        root: SlotsRoot
      },

      slotProps: {
        input: {
          ...componentsInputProps,
          ...slotsInputProps
        },

        root: slotsRootProps
      }
    },
  },
});

fn({
  MuiInputBase: {
    defaultProps: {
      slots: {
        input: SlotsInput,
        root: SlotsRoot
      },

      slotProps: {
        input: {
          ...componentsInputProps,
          ...slotsInputProps
        },

        root: {
          ...componentsRootProps,
          ...slotsRootProps
        }
      }
    },
  },
});
