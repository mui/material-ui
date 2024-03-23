import { generateUtilityClass, generateUtilityClasses } from '../className';

export interface SwitchClasses {
  /** Class name applied to the root element. */
  root: string;
  /** State class applied to the root `checked` class. */
  checked: string;
  /** State class applied to the root disabled class. */
  disabled: string;
  /** Class name applied to the action element. */
  action: string;
  /** Class name applied to the input element. */
  input: string;
  /** Class name applied to the input element. */
  thumb: string;
  /** Class name applied to the track element. */
  track: string;
  /** State class applied to the root element if the switch has visible focus */
  focusVisible: string;
  /** Class name applied to the root element if the switch is read-only */
  readOnly: string;
  /** Class name applied to the root element if `color="primary"`. */
  colorPrimary: string;
  /** Class name applied to the root element if `color="danger"`. */
  colorDanger: string;
  /** Class name applied to the root element if `color="success"`. */
  colorSuccess: string;
  /** Class name applied to the root element if `color="warning"`. */
  colorWarning: string;
  /** Class name applied to the root element when color inversion is triggered. */
  colorContext: string;
  /** Class name applied to the root element if `size="sm"`. */
  sizeSm: string;
  /** Class name applied to the root element if `size="md"`. */
  sizeMd: string;
  /** Class name applied to the root element if `size="lg"`. */
  sizeLg: string;
  /** Class name applied to the root element if `variant="outlined"`. */
  variantOutlined: string;
  /** Class name applied to the root element if `variant="soft"`. */
  variantSoft: string;
  /** Class name applied to the root element if `variant="solid"`. */
  variantSolid: string;
  /** Class name applied to the startDecorator element. */
  startDecorator: string;
  /** Class name applied to the endDecorator element. */
  endDecorator: string;
}

export type SwitchClassKey = keyof SwitchClasses;

export function getSwitchUtilityClass(slot: string): string {
  return generateUtilityClass('MuiSwitch', slot);
}

const switchClasses: SwitchClasses = generateUtilityClasses('MuiSwitch', [
  'root',
  'checked',
  'disabled',
  'action',
  'input',
  'thumb',
  'track',
  'focusVisible',
  'readOnly',
  'colorPrimary',
  'colorDanger',
  'colorSuccess',
  'colorWarning',
  'colorContext',
  'sizeSm',
  'sizeMd',
  'sizeLg',
  'variantOutlined',
  'variantSoft',
  'variantSolid',
  'startDecorator',
  'endDecorator',
]);

export default switchClasses;
