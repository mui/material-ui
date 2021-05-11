import { TreeViewClassKey } from './TreeView';

declare const treeViewClasses: Record<TreeViewClassKey, string>;

export function getTreeViewUtilityClass(slot: string): string;

export default treeViewClasses;
