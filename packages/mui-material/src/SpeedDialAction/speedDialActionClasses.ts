import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';

export interface SpeedDialActionClasses {
  /** Styles applied to the Fab component. */
  fab: string;
  /** Styles applied to the Fab component if `open={false}`. */
  /*
   * @deprecated Combine the [.MuiSpeedDialAction-fab](/material-ui/api/speed-dial-action/#speed-dial-action-classes-MuiSpeedDialAction-fab)
   * and a dedicated closed/state class instead. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/)
   * for more details.
   */
  fabClosed: string;
  /** Styles applied to the root element if `tooltipOpen={true}`. */
  staticTooltip: string;
  /** Styles applied to the root element if `tooltipOpen={true}` and `open={false}`. */
  /*
   * @deprecated Combine the [.MuiSpeedDialAction-staticTooltip](/material-ui/api/speed-dial-action/#speed-dial-action-classes-MuiSpeedDialAction-staticTooltip)
   * and a dedicated closed/state class instead. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/)
   * for more details.
   */
  staticTooltipClosed: string;
  /** Styles applied to the static tooltip label if `tooltipOpen={true}`. */
  staticTooltipLabel: string;
  /** Styles applied to the root element if `tooltipOpen={true}` and `tooltipPlacement="left"`` */
  tooltipPlacementLeft: string;
  /** Styles applied to the root element if `tooltipOpen={true}` and `tooltipPlacement="right"`` */
  tooltipPlacementRight: string;
}

export type SpeedDialActionClassKey = keyof SpeedDialActionClasses;

export function getSpeedDialActionUtilityClass(slot: string): string {
  return generateUtilityClass('MuiSpeedDialAction', slot);
}

const speedDialActionClasses: SpeedDialActionClasses = generateUtilityClasses(
  'MuiSpeedDialAction',
  [
    'fab',
    'fabClosed',
    'staticTooltip',
    'staticTooltipClosed',
    'staticTooltipLabel',
    'tooltipPlacementLeft',
    'tooltipPlacementRight',
  ],
);

export default speedDialActionClasses;
