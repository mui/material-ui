import { ToolbarClassKey } from './Toolbar';

export type ToolbarClasses = Record<ToolbarClassKey, string>;

declare const toolbarClasses: ToolbarClasses;

export function getToolbarUtilityClass(slot: string): string;

export default toolbarClasses;
