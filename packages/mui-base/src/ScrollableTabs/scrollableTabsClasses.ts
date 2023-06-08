import generateUtilityClass from '../generateUtilityClass';
import generateUtilityClasses from '../generateUtilityClasses';

export interface ScrollableTabsClasses {
  /** Class name applied to the root element. */
  root: string;
  /** Class name applied to the root element if `orientation='horizontal'`. */
  horizontal: string;
  /** Class name applied to the root element if `orientation='vertical'`. */
  vertical: string;
}

export type ScrollableTabsClassKey = keyof ScrollableTabsClasses;

export function getTabsUtilityClass(slot: string): string {
  return generateUtilityClass('MuiTabs', slot);
}

const scrollableTabsClasses: ScrollableTabsClasses = generateUtilityClasses('MuiTabs', [
  'root',
  'horizontal',
  'vertical',
]);

export default scrollableTabsClasses;
