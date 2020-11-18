interface SliderClasses {
  root: string;
  active: string;
  focusVisible: string;
  colorPrimary: string;
  colorSecondary: string;
  disabled: string;
  marked: string;
  vertical: string;
  trackInverted: string;
  trackFalse: string;
  rail: string;
  track: string;
  mark: string;
  markActive: string;
  markLabel: string;
  markLabelActive: string;
  thumb: string;
  thumbPrimary: string;
  thumbSecondary: string;
  valueLabel: string;
  valueLabelOffset: string;
  valueLabelOpen: string;
  valueLabelCircle: string;
  valueLabelLabel: string;
}

const getUtilityClass = (name: string): string => {
  return `MuiSlider-${name}`;
};

const sliderClasses: SliderClasses = {
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
