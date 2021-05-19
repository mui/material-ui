import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getSpeedDialActionUtilityClass(slot) {
  return generateUtilityClass('MuiSpeedDialAction', slot);
}

const speedDialActionClasses = generateUtilityClasses('MuiSpeedDialAction', [
  'fab',
  'fabClosed',
  'staticTooltip',
  'staticTooltipClosed',
  'staticTooltipLabel',
  'tooltipPlacementLeft',
  'tooltipPlacementRight',
]);

export default speedDialActionClasses;
