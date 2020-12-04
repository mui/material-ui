export interface SliderClasses {
  root: string;
  active: string;
  focusVisible: string;
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
  valueLabel: string;
  valueLabelOffset: string;
  valueLabelOpen: string;
  valueLabelCircle: string;
  valueLabelLabel: string;
}

declare const sliderClasses: SliderClasses;

declare const getSliderUtilityClass: (part: string) => string;

export default sliderClasses;
