import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export interface ListItemButtonClasses {
  /** Styles applied to the root element */
  root: string;
  /** Styles applied to the button element */
  button: string;
  /** Pseudo-class applied to the button's `focusVisibleClassName` prop. */
  focusVisible: string;
  /** Styles applied to the root element if dense. */
  dense: string;
  /** Styles applied to the root element if `alignItems="flex-start"`. */
  alignItemsFlexStart: string;
  /** Pseudo-class applied to the root element if `disabled={true}`. */
  disabled: string;
  /** Styles applied to the root element if `divider={true}`. */
  divider: string;
  /** Styles applied to the root element unless `disableGutters={true}`. */
  gutters: string;
  /** Pseudo-class applied to the root element if `selected={true}`. */
  selected: string;
}

export type ListItemButtonClassKey = keyof ListItemButtonClasses;

export function getListItemButtonUtilityClass(slot: string): string {
  return generateUtilityClass('MuiListItemButton', slot);
}

const listItemButtonClasses: ListItemButtonClasses = generateUtilityClasses('MuiListItemButton', [
  'root',
  'button',
  'focusVisible',
  'dense',
  'alignItemsFlexStart',
  'disabled',
  'divider',
  'gutters',
  'selected',
]);

export default listItemButtonClasses;
