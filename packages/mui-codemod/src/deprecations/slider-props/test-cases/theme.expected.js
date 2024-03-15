fn({
  MuiSlider: {
    defaultProps: {
      slots: {
        track: ComponentsTrack
      },

      slotProps: {
        track: componentsTrackProps
      }
    },
  },
});

fn({
  MuiSlider: {
    defaultProps: {
      slots: {
        track: ComponentsTrack,
        rail: SlotsRail
      },

      slotProps: {
        track: componentsTrackProps,
        rail: slotsRailProps
      }
    },
  },
});

fn({
  MuiSlider: {
    defaultProps: {
      slots: {
        track: SlotsTrack,
        rail: SlotsRail
      },

      slotProps: {
        track: {
          ...componentsTrackProps,
          ...slotsTrackProps
        },

        rail: slotsRailProps
      }
    },
  },
});

fn({
  MuiSlider: {
    defaultProps: {
      slots: {
        track: SlotsTrack,
        rail: SlotsRail
      },

      slotProps: {
        track: {
          ...componentsTrackProps,
          ...slotsTrackProps
        },

        rail: {
          ...componentsRailProps,
          ...slotsRailProps
        }
      }
    },
  },
});
