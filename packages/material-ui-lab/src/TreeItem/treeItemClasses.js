import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getTreeItemUtilityClass(slot) {
  return generateUtilityClass('MuiTreeItem', slot);
}

const treeItemClasses = generateUtilityClasses('MuiTreeItem', [
  'root',
  'group',
  'content',
  'expanded',
  'selected',
  'focused',
  'disabled',
  'iconContainer',
  'label',
]);

export default treeItemClasses;
