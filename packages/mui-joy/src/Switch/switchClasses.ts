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
  /** Styles applied to the root element if `palette="primary"`. */
  palettePrimary: string;
  /** Styles applied to the root element if `palette="danger"`. */
  paletteDanger: string;
  /** Styles applied to the root element if `palette="info"`. */
  paletteInfo: string;
  /** Styles applied to the root element if `palette="success"`. */
  paletteSuccess: string;
  /** Styles applied to the root element if `palette="warning"`. */
  paletteWarning: string;
  /** Styles applied to the root element if `size="sm"`. */
  sizeSm: string;
  /** Styles applied to the root element if `size="md"`. */
  sizeMd: string;
  /** Styles applied to the root element if `size="lg"`. */
  sizeLg: string;
  /** Styles applied to the root element if `variant="outlined"`. */
  variantOutlined: string;
  /** Styles applied to the root element if `variant="light"`. */
  variantLight: string;
  /** Styles applied to the root element if `variant="contained"`. */
  variantContained: string;
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
  'palettePrimary',
  'paletteDanger',
  'paletteInfo',
  'paletteSuccess',
  'paletteWarning',
  'sizeSm',
  'sizeMd',
  'sizeLg',
  'variantOutlined',
  'variantLight',
  'variantContained',
]);

export default switchClasses;
