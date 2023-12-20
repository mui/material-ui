import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';

export interface SwitchClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if `edge="start"`. */
  edgeStart: string;
  /** Styles applied to the root element if `edge="end"`. */
  edgeEnd: string;
  /** Styles applied to the internal `SwitchBase` component's `root` class. */
  switchBase: string;
  /** Styles applied to the internal SwitchBase component's root element if `color="primary"`. */
  colorPrimary: string;
  /** Styles applied to the internal SwitchBase component's root element if `color="secondary"`. */
  colorSecondary: string;
  /** Styles applied to the root element if `size="small"`. */
  sizeSmall: string;
  /** Styles applied to the root element if `size="medium"`. */
  sizeMedium: string;
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
}

export type SwitchClassKey = keyof SwitchClasses;

export function getSwitchUtilityClass(slot: string): string {
  return generateUtilityClass('MuiSwitch', slot);
}

const switchClasses: SwitchClasses = generateUtilityClasses('MuiSwitch', [
  'root',
  'edgeStart',
  'edgeEnd',
  'switchBase',
  'colorPrimary',
  'colorSecondary',
  'sizeSmall',
  'sizeMedium',
  'checked',
  'disabled',
  'input',
  'thumb',
  'track',
]);

export default switchClasses;
