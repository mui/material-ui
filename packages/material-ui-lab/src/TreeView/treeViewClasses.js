import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getTreeViewUtilityClass(slot) {
  return generateUtilityClass('MuiTreeView', slot);
}

const treeViewClasses = generateUtilityClasses('MuiTreeView', ['root']);

export default treeViewClasses;
