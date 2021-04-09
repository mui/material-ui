import { BottomNavigationActionClassKey } from './BottomNavigationAction';

export type BottomNavigationActionClasses = Record<BottomNavigationActionClassKey, string>;

declare const bottomNavigationActionClasses: BottomNavigationActionClasses;

export function getBottomNavigationActionUtilityClass(slot: string): string;

export default bottomNavigationActionClasses;
