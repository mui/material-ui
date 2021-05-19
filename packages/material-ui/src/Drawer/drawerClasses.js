import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getDrawerUtilityClass(slot) {
  return generateUtilityClass('MuiDrawer', slot);
}

const drawerClasses = generateUtilityClasses('MuiDrawer', [
  'root',
  'docked',
  'paper',
  'paperAnchorLeft',
  'paperAnchorRight',
  'paperAnchorTop',
  'paperAnchorBottom',
  'paperAnchorDockedLeft',
  'paperAnchorDockedRight',
  'paperAnchorDockedTop',
  'paperAnchorDockedBottom',
  'modal',
]);

export default drawerClasses;
