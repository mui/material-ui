import { unstable_generateUtilityClasses as generateUtilityClasses } from '@mui/utils';
import generateUtilityClass from '../generateUtilityClass';

export interface ListItemSecondaryActionClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element when the parent `ListItem` has `disableGutters={true}`. */
  disableGutters: string;
}

export type ListItemSecondaryActionClassKey = keyof ListItemSecondaryActionClasses;

export function getListItemSecondaryActionClassesUtilityClass(slot: string): string {
  return generateUtilityClass('MuiListItemSecondaryAction', slot);
}

const listItemSecondaryActionClasses: ListItemSecondaryActionClasses = generateUtilityClasses(
  'MuiListItemSecondaryAction',
  ['root', 'disableGutters'],
);

export default listItemSecondaryActionClasses;
