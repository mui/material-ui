import { DrawerClassKey } from './Drawer';

declare const drawerClasses: Record<DrawerClassKey, string>;

export function getDrawerUtilityClass(slot: string): string;

export default drawerClasses;
