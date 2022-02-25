import { generateUtilityClass, generateUtilityClasses } from '@mui/base';

export interface ListItemDecoratorClasses {
  /** Styles applied to the root element. */
  root: string;
}

export type ListItemDecoratorClassKey = keyof ListItemDecoratorClasses;

export function getListItemDecoratorUtilityClass(slot: string): string {
  return generateUtilityClass('MuiListItemDecorator', slot);
}

const listItemDecoratorClasses: ListItemDecoratorClasses = generateUtilityClasses(
  'MuiListItemDecorator',
  ['root'],
);

export default listItemDecoratorClasses;
