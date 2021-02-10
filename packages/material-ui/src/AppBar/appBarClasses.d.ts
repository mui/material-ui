import { AppBarClassKey } from './AppBar';

export type AppBarClasses = Record<AppBarClassKey, string>;

declare const appBarClasses: AppBarClasses;

export function getAppBarUtilityClass(slot: string): string;

export default appBarClasses;
