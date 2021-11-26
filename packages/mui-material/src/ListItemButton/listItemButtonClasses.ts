import {
  generateUtilityClass,
  generateUtilityClasses,
  experimental_useClassNameGenerator as useClassNameGenerator,
} from '@mui/base';

export interface ListItemButtonClasses {
  /** Styles applied to the root element. */
  root: string;
  /** State class applied to the `component`'s `focusVisibleClassName` prop. */
  focusVisible: string;
  /** Styles applied to the component element if dense. */
  dense: string;
  /** Styles applied to the component element if `alignItems="flex-start"`. */
  alignItemsFlexStart: string;
  /** State class applied to the inner `component` element if `disabled={true}`. */
  disabled: string;
  /** Styles applied to the inner `component` element if `divider={true}`. */
  divider: string;
  /** Styles applied to the inner `component` element unless `disableGutters={true}`. */
  gutters: string;
  /** State class applied to the root element if `selected={true}`. */
  selected: string;
}

export type ListItemButtonClassKey = keyof ListItemButtonClasses;

/**
 * @deprecated Replaced by react hook `use{Component}ClassNameGenerator`.
 * This function will be removed in the next major release.
 */
export function getListItemButtonUtilityClass(slot: string): string {
  return generateUtilityClass('MuiListItemButton', slot);
}

export function useListItemButtonClassNameGenerator() {
  return useClassNameGenerator<ListItemButtonClassKey>({ name: 'MuiListItemButton' });
}

const listItemButtonClasses: ListItemButtonClasses = generateUtilityClasses('MuiListItemButton', [
  'root',
  'focusVisible',
  'dense',
  'alignItemsFlexStart',
  'disabled',
  'divider',
  'gutters',
  'selected',
]);

export default listItemButtonClasses;
