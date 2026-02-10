import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';

export interface DrawerClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if `variant="permanent or persistent"`. */
  docked: string;
  /** Styles applied to the Paper component. */
  paper: string;
  /** Styles applied to the Paper component if `anchor="left"`. */
  paperAnchorLeft: string;
  /** Styles applied to the Paper component if `anchor="right"`. */
  paperAnchorRight: string;
  /** Styles applied to the Paper component if `anchor="top"`. */
  paperAnchorTop: string;
  /** Styles applied to the Paper component if `anchor="bottom"`. */
  paperAnchorBottom: string;
  /** Styles applied to the Paper component if `anchor="left"` and `variant` is not "temporary". */
  paperAnchorDockedLeft: string;
  /** Styles applied to the Paper component if `anchor="top"` and `variant` is not "temporary". */
  paperAnchorDockedTop: string;
  /** Styles applied to the Paper component if `anchor="right"` and `variant` is not "temporary". */
  paperAnchorDockedRight: string;
  /** Styles applied to the Paper component if `anchor="bottom"` and `variant` is not "temporary". */
  paperAnchorDockedBottom: string;
  /** Styles applied to the Modal component. */
  modal: string;
}

export type DrawerClassKey = keyof DrawerClasses;

export function getDrawerUtilityClass(slot: string): string {
  return generateUtilityClass('MuiDrawer', slot);
}

const drawerClasses: DrawerClasses = generateUtilityClasses('MuiDrawer', [
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
