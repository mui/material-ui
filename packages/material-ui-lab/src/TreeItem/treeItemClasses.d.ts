import { TreeItemClassKey } from './TreeItem';

export type TreeItemClasses = Record<TreeItemClassKey, string>;

declare const treeItemClasses: TreeItemClasses;

export function getTreeItemUtilityClass(slot: string): string;

export default treeItemClasses;
