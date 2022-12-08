import { generateUtilityClass, generateUtilityClasses } from '../className';

export interface ListItemDecoratorClasses {
  /** Styles applied to the root element. */
  root: string;
}

export type ListItemDecoratorClassKey = keyof ListItemDecoratorClasses;

export function getListItemDecoratorUtilityClass(slot: string): string {
  return generateUtilityClass('JoyListItemDecorator', slot);
}

const listItemDecoratorClasses: ListItemDecoratorClasses = generateUtilityClasses(
  'JoyListItemDecorator',
  ['root'],
);

export default listItemDecoratorClasses;
