import { generateUtilityClass, generateUtilityClasses } from '@mui/core';

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
}

export type SwitchClassKey = keyof SwitchClasses;

export function getSwitchUtilityClass(slot: string): string {
  return generateUtilityClass('JoySwitch', slot);
}

const switchClasses: SwitchClasses = generateUtilityClasses('JoySwitch', [
  'root',
  'checked',
  'disabled',
  'input',
  'thumb',
  'track',
  'focusVisible',
  'readOnly',
]);

export default switchClasses;
