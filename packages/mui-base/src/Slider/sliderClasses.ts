import { generateUtilityClasses } from '../generateUtilityClasses';
import { generateUtilityClass } from '../generateUtilityClass';

const COMPONENT_NAME = 'Slider';

export interface SliderClasses {
  /** Class name applied to the root element. */
  root: string;
  /** Class name applied to the root element if `marks` is provided with at least one label. */
  marked: string;
  /** Class name applied to the root element if `orientation="vertical"`. */
  vertical: string;
  /** State class applied to the root and thumb element if `disabled={true}`. */
  disabled: string;
  /** State class applied to the root if a thumb is being dragged. */
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
  /** State class applied to the thumb element if it's active. */
  active: string;
  /** State class applied to the thumb element if keyboard focused. */
  focusVisible: string;
  /** Class name applied to the mark element. */
  mark: string;
  /** Class name applied to the mark element if active (depending on the value). */
  markActive: string;
  /** Class name applied to the mark label element. */
  markLabel: string;
  /** Class name applied to the mark label element if active (depending on the value). */
  markLabelActive: string;
}

export type SliderClassKey = keyof SliderClasses;

export function getSliderUtilityClass(slot: string): string {
  return generateUtilityClass(COMPONENT_NAME, slot);
}

export const sliderClasses: SliderClasses = generateUtilityClasses(COMPONENT_NAME, [
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
]);
