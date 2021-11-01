import { generateUtilityClass, generateUtilityClasses } from '@mui/core';

export interface TreeViewClasses {
  /** Styles applied to the root element. */
  root: string;
}

export type TreeViewClassKey = keyof TreeViewClasses;

export function getTreeViewUtilityClass(slot: string): string {
  return generateUtilityClass('MuiTreeView', slot);
}

export const getTreeViewClasses = (): TreeViewClasses => generateUtilityClasses('MuiTreeView', ['root']);

const treeViewClasses = getTreeViewClasses();

export default treeViewClasses;
