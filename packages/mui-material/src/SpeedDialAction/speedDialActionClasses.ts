import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';

export interface SpeedDialActionClasses {
  /** Styles applied to the Fab component. */
  fab: string;
  /** Styles applied to the Fab component if `open={false}`. */
  fabClosed: string;
  /** Styles applied to the root element if `tooltipOpen={true}`. */
  staticTooltip: string;
  /** Styles applied to the root element if `tooltipOpen={true}` and `open={false}`. */
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
