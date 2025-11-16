import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';

export interface SpeedDialIconClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the icon component. */
  icon: string;
  /** Styles applied to the icon component if `open={true}`. */
  iconOpen: string;
  /** Styles applied to the icon when an `openIcon` is provided and if `open={true}`. */
  /*
   * @deprecated Combine the [.MuiSpeedDialIcon-iconWithOpenIcon](/material-ui/api/speed-dial-icon/#speed-dial-icon-classes-MuiSpeedDialIcon-iconWithOpenIcon)
   * and a dedicated open/state class instead. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/)
   * for more details.
   */
  iconWithOpenIconOpen: string;
  /** Styles applied to the `openIcon` if provided. */
  openIcon: string;
  /** Styles applied to the `openIcon` if provided and if `open={true}`. */
  /*
   * @deprecated Combine the [.MuiSpeedDialIcon-openIcon](/material-ui/api/speed-dial-icon/#speed-dial-icon-classes-MuiSpeedDialIcon-openIcon)
   * and a dedicated open/state class instead. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/)
   * for more details.
   */
  openIconOpen: string;
}

export type SpeedDialIconClassKey = keyof SpeedDialIconClasses;

export function getSpeedDialIconUtilityClass(slot: string): string {
  return generateUtilityClass('MuiSpeedDialIcon', slot);
}

const speedDialIconClasses: SpeedDialIconClasses = generateUtilityClasses('MuiSpeedDialIcon', [
  'root',
  'icon',
  'iconOpen',
  'iconWithOpenIconOpen',
  'openIcon',
  'openIconOpen',
]);

export default speedDialIconClasses;
