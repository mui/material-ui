import { generateUtilityClass, generateUtilityClasses } from '../className';

export interface ListItemDecoratorClasses {
  /** Class name applied to the root element. */
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
