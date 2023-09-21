import { generateUtilityClass, generateUtilityClasses } from '../className';

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
  /** State class applied to the thumb element if it has keyboard focused. */
  focusVisible: string;
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
  /** Class name applied to the thumb label element. */
  valueLabel: string;
  /** Class name applied to the thumb label element if it's open. */
  valueLabelOpen: string;
  /** Class name applied to the mark element. */
  mark: string;
  /** Class name applied to the mark element when it is active. */
  markActive: string;
  /** Class name applied to the mark label element. */
  markLabel: string;
  /** Class name applied to the root element if `color="primary"`. */
  colorPrimary: string;
  /** Class name applied to the root element if `color="neutral"`. */
  colorNeutral: string;
  /** Class name applied to the root element if `color="danger"`. */
  colorDanger: string;
  /** Class name applied to the root element if `color="success"`. */
  colorSuccess: string;
  /** Class name applied to the root element if `color="warning"`. */
  colorWarning: string;
  /** Class name applied to the root element when color inversion is triggered. */
  colorContext: string;
  /** Class name applied to the root element if `variant="plain"`. */
  variantPlain: string;
  /** Class name applied to the root element if `variant="outlined"`. */
  variantOutlined: string;
  /** Class name applied to the root element if `variant="soft"`. */
  variantSoft: string;
  /** Class name applied to the root element if `variant="solid"`. */
  variantSolid: string;
  /** Class name applied to the root element if `size="sm"`. */
  sizeSm: string;
  /** Class name applied to the root element if `size="md"`. */
  sizeMd: string;
  /** Class name applied to the root element if `size="lg"`. */
  sizeLg: string;
  /** Class name applied to the input element. */
  input: string;
}

export type SliderClassKey = keyof SliderClasses;

export function getSliderUtilityClass(slot: string): string {
  return generateUtilityClass('MuiSlider', slot);
}

const sliderClasses: SliderClasses = generateUtilityClasses('MuiSlider', [
  'root',
  'disabled',
  'dragging',
  'focusVisible',
  'marked',
  'vertical',
  'trackInverted',
  'trackFalse',
  'rail',
  'track',
  'mark',
  'markActive',
  'markLabel',
  'thumb',
  'thumbStart',
  'thumbEnd',
  'valueLabel',
  'valueLabelOpen',
  'colorPrimary',
  'colorNeutral',
  'colorDanger',
  'colorSuccess',
  'colorWarning',
  'colorContext',
  'variantPlain',
  'variantOutlined',
  'variantSoft',
  'variantSolid',
  'disabled',
  'sizeSm',
  'sizeMd',
  'sizeLg',
  'input',
]);

export default sliderClasses;
