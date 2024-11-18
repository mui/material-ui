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

fn({
  MuiStepLabel: {
    defaultProps: {
      slots: {
        stepIcon: StepIconComponent
      },

      slotProps: {
        stepIcon: StepIconProps
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
        },

        stepIcon: StepIconProps
      },

      slots: {
        stepIcon: StepIconComponent
      }
    },
  },
});
