import { generateUtilityClass, generateUtilityClasses } from '@mui/base';

export interface SwitchClasses {
  /** Styles applied to the root element. */
  root: string;
  /** State class applied to the internal `SwitchBase` component's `checked` class. */
  checked: string;
  /** State class applied to the internal SwitchBase component's disabled class. */
  disabled: string;
  /** Styles applied to the internal SwitchBase component's input element. */
  input: string;
  /** Styles used to create the thumb passed to the internal `SwitchBase` component `icon` prop. */
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
  /** Styles applied to the root element if `elevation="xs"`. */
  elevationXs: string;
  /** Styles applied to the root element if `elevation="sm"`. */
  elevationSm: string;
  /** Styles applied to the root element if `elevation="md"`. */
  elevationMd: string;
  /** Styles applied to the root element if `elevation="lg"`. */
  elevationLg: string;
  /** Styles applied to the root element if `elevation="xl"`. */
  elevationXl: string;
  /** Styles applied to the root element if `roundness="xs"`. */
  roundnessXs: string;
  /** Styles applied to the root element if `roundness="sm"`. */
  roundnessSm: string;
  /** Styles applied to the root element if `roundness="md"`. */
  roundnessMd: string;
  /** Styles applied to the root element if `roundness="lg"`. */
  roundnessLg: string;
  /** Styles applied to the root element if `roundness="xl"`. */
  roundnessXl: string;
  /** Styles applied to the root element if `size="small"`. */
  sizeSmall: string;
  /** Styles applied to the root element if `size="large"`. */
  sizeLarge: string;
}

export type SwitchClassKey = keyof SwitchClasses;

export function getSwitchUtilityClass(slot: string): string {
  return generateUtilityClass('MuiSwitch', slot);
}

const switchClasses: SwitchClasses = generateUtilityClasses('MuiSwitch', [
  'root',
  'checked',
  'disabled',
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
  'elevationXs',
  'elevationSm',
  'elevationMd',
  'elevationLg',
  'elevationXl',
  'roundnessXs',
  'roundnessSm',
  'roundnessMd',
  'roundnessLg',
  'roundnessXl',
  'sizeSmall',
  'sizeLarge',
]);

export default switchClasses;
