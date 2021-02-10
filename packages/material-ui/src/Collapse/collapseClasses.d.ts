import { CollapseClassKey } from './Collapse';

export type CollapseClasses = Record<CollapseClassKey, string>;

declare const collapseClasses: CollapseClasses;

export function getCollapseUtilityClass(slot: string): string;

export default collapseClasses;
