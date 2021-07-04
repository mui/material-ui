import generateUtilityClasses from '../generateUtilityClasses';
import generateUtilityClass from '../generateUtilityClass';

export interface SliderUnstyledClasses {
  /** Class name applied to the root element. */
  root: string;
  /** Class name applied to the root element if `marks` is provided with at least one label. */
  marked: string;
  /** Class name applied to the root element if `orientation="vertical"`. */
  vertical: string;
  /** Pseudo-class applied to the root and thumb element if `disabled={true}`. */
  disabled: string;
  /** Pseudo-class applied to the root if a thumb is being dragged. */
  dragging: string;
  /** Class name applied to the rail element. */
  rail: string;
  /** Class name applied to the track element. */
  track: string;
  /** Class name applied to the root element if `track={false}`. */
  trackFalse: string;
  /** Class name applied to the root element if `track="inverted"`. */
  trackInverted: string;
  /** Class name applied to the thumb element. */
  thumb: string;
  /** Pseudo-class applied to the thumb element if it's active. */
  active: string;
  /** Pseudo-class applied to the thumb element if keyboard focused. */
  focusVisible: string;
  /** Class name applied to the thumb label element. */
  valueLabel: string;
  /** Class name applied to the thumb label element if it's open. */
  valueLabelOpen: string;
  /** Class name applied to the thumb label's circle element. */
  valueLabelCircle: string;
  /** Class name applied to the thumb label's label element. */
  valueLabelLabel: string;
  /** Class name applied to the mark element. */
  mark: string;
  /** Class name applied to the mark element if active (depending on the value). */
  markActive: string;
  /** Class name applied to the mark label element. */
  markLabel: string;
  /** Class name applied to the mark label element if active (depending on the value). */
  markLabelActive: string;
}

export type SliderUnstyledClassKey = keyof SliderUnstyledClasses;

export function getSliderUtilityClass(slot: string): string {
  return generateUtilityClass('MuiSlider', slot);
}

const sliderUnstyledClasses: SliderUnstyledClasses = generateUtilityClasses('MuiSlider', [
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
