import generateUtilityClasses from '../generateUtilityClasses';
import generateUtilityClass from '../generateUtilityClass';

export function getSliderUtilityClass(slot) {
  return generateUtilityClass('MuiSlider', slot);
}

const sliderUnstyledClasses = generateUtilityClasses('MuiSlider', [
  'root',
  'active',
  'focusVisible',
  'disabled',
  'dragging',
  'marked',
  'vertical',
  'trackInverted',
  'trackFalse',
  'rail',
  'track',
  'mark',
  'markActive',
  'markLabel',
  'markLabelActive',
  'thumb',
  'valueLabel',
  'valueLabelOpen',
  'valueLabelCircle',
  'valueLabelLabel',
]);

export default sliderUnstyledClasses;
