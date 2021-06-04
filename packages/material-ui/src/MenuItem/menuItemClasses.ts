import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';
import { ListItemButtonClasses } from '../ListItemButton';

export interface MenuItemClasses extends ListItemButtonClasses {}

export type MenuItemClassKey = keyof MenuItemClasses;

export function getMenuItemUtilityClass(slot: string): string {
  return generateUtilityClass('MuiMenuItem', slot);
}

const menuItemClasses: MenuItemClasses = generateUtilityClasses('MuiMenuItem', [
  'root',
  'focusVisible',
  'dense',
  'alignItemsFlexStart',
  'disabled',
  'divider',
  'gutters',
  'selected',
]);

export default menuItemClasses;
