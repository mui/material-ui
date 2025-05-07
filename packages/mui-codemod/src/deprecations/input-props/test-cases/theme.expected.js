fn({
  MuiInput: {
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
  MuiInput: {
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
  MuiInput: {
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
  MuiInput: {
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
