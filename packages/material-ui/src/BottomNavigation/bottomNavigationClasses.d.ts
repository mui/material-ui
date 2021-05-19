import { BottomNavigationClassKey } from './BottomNavigation';

export type BottomNavigationClasses = Record<BottomNavigationClassKey, string>;

declare const bottomNavigationClasses: BottomNavigationClasses;

export function getBottomNavigationUtilityClass(slot: string): string;

export default bottomNavigationClasses;
