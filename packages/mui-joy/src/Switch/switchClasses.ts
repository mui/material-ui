import { generateUtilityClass, generateUtilityClasses } from '@mui/base';

export interface SwitchClasses {
  /** Styles applied to the root element. */
  root: string;
  /** State class applied to the root `checked` class. */
  checked: string;
  /** State class applied to the root disabled class. */
  disabled: string;
  /** Styles applied to the action element. */
  action: string;
  /** Styles applied to the input element. */
  input: string;
  /** Styles Styles applied to the input element. */
  thumb: string;
  /** Styles applied to the track element. */
  track: string;
  /** Class applied to the root element if the switch has visible focus */
  focusVisible: string;
  /** Class applied to the root element if the switch is read-only */
  readOnly: string;
  /** Styles applied to the root element if `color="primary"`. */
  colorPrimary: string;
  /** Styles applied to the root element if `color="danger"`. */
  colorDanger: string;
  /** Styles applied to the root element if `color="info"`. */
  colorInfo: string;
  /** Styles applied to the root element if `color="success"`. */
  colorSuccess: string;
  /** Styles applied to the root element if `color="warning"`. */
  colorWarning: string;
  /** Styles applied to the root element if `size="sm"`. */
  sizeSm: string;
  /** Styles applied to the root element if `size="md"`. */
  sizeMd: string;
  /** Styles applied to the root element if `size="lg"`. */
  sizeLg: string;
  /** Styles applied to the root element if `variant="outlined"`. */
  variantOutlined: string;
  /** Styles applied to the root element if `variant="soft"`. */
  variantSoft: string;
  /** Styles applied to the root element if `variant="solid"`. */
  variantSolid: string;
}

export type SwitchClassKey = keyof SwitchClasses;

export function getSwitchUtilityClass(slot: string): string {
  return generateUtilityClass('JoySwitch', slot);
}

const switchClasses: SwitchClasses = generateUtilityClasses('JoySwitch', [
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
  'colorInfo',
  'colorSuccess',
  'colorWarning',
  'sizeSm',
  'sizeMd',
  'sizeLg',
  'variantOutlined',
  'variantSoft',
  'variantSolid',
]);

export default switchClasses;
