fn({
  MuiSlider: {
    defaultProps: {
      components: { Track: ComponentsTrack },
      componentsProps: { track: componentsTrackProps },
    },
  },
});

fn({
  MuiSlider: {
    defaultProps: {
      components: { Track: ComponentsTrack },
      slots: { rail: SlotsRail },
      componentsProps: { track: componentsTrackProps },
      slotProps: { rail: slotsRailProps },
    },
  },
});

fn({
  MuiSlider: {
    defaultProps: {
      components: { Track: ComponentsTrack },
      slots: { rail: SlotsRail, track: SlotsTrack },
      componentsProps: { track: componentsTrackProps },
      slotProps: { rail: slotsRailProps, track: slotsTrackProps },
    },
  },
});

fn({
  MuiSlider: {
    defaultProps: {
      components: { Track: ComponentsTrack },
      slots: { rail: SlotsRail, track: SlotsTrack },
      componentsProps: { track: componentsTrackProps, rail: componentsRailProps },
      slotProps: { rail: slotsRailProps, track: slotsTrackProps },
    },
  },
});
