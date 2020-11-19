const getUtilityClass = (name) => {
  return `MuiSlider-${name}`;
};

const sliderClasses = {
  root: getUtilityClass('root'),
  active: 'Mui-active',
  focusVisible: 'Mui-focusVisible',
  colorPrimary: getUtilityClass('colorPrimary'),
  colorSecondary: getUtilityClass('colorSecondary'),
  disabled: 'Mui-disabled',
  marked: getUtilityClass('marked'),
  vertical: getUtilityClass('vertical'),
  trackInverted: getUtilityClass('trackInverted'),
  trackFalse: getUtilityClass('trackFalse'),
  rail: getUtilityClass('rail'),
  track: getUtilityClass('track'),
  mark: getUtilityClass('mark'),
  markActive: getUtilityClass('markActive'),
  markLabel: getUtilityClass('markLabel'),
  markLabelActive: getUtilityClass('markLabelActive'),
  thumb: getUtilityClass('thumb'),
  thumbPrimary: getUtilityClass('thumbColorPrimary'),
  thumbSecondary: getUtilityClass('thumbColorPrimary'),
  valueLabel: getUtilityClass('valueLabel'),
  valueLabelOffset: getUtilityClass('valueLabelOffset'),
  valueLabelOpen: getUtilityClass('valueLabelOpen'),
  valueLabelCircle: getUtilityClass('valueLabelCircle'),
  valueLabelLabel: getUtilityClass('valueLabelLabel'),
};

export default sliderClasses;
