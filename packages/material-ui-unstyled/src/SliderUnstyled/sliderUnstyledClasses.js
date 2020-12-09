export function getSliderUtilityClass(name) {
  return `MuiSlider-${name}`;
}

const sliderUnstyledClasses = {
  root: getSliderUtilityClass('root'),
  active: 'Mui-active',
  focusVisible: 'Mui-focusVisible',
  disabled: 'Mui-disabled',
  marked: getSliderUtilityClass('marked'),
  vertical: getSliderUtilityClass('vertical'),
  trackInverted: getSliderUtilityClass('trackInverted'),
  trackFalse: getSliderUtilityClass('trackFalse'),
  rail: getSliderUtilityClass('rail'),
  track: getSliderUtilityClass('track'),
  mark: getSliderUtilityClass('mark'),
  markActive: getSliderUtilityClass('markActive'),
  markLabel: getSliderUtilityClass('markLabel'),
  markLabelActive: getSliderUtilityClass('markLabelActive'),
  thumb: getSliderUtilityClass('thumb'),
  valueLabel: getSliderUtilityClass('valueLabel'),
  valueLabelOffset: getSliderUtilityClass('valueLabelOffset'),
  valueLabelOpen: getSliderUtilityClass('valueLabelOpen'),
  valueLabelCircle: getSliderUtilityClass('valueLabelCircle'),
  valueLabelLabel: getSliderUtilityClass('valueLabelLabel'),
};

export default sliderUnstyledClasses;
