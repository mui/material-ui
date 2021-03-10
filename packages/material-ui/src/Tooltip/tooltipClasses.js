import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getTooltipUtilityClass(slot) {
  return generateUtilityClass('MuiTooltip', slot);
}

const tooltipClasses = generateUtilityClasses('MuiTooltip', [
  'popper',
  'popperInteractive',
  'popperArrow',
  'tooltip',
  'tooltipArrow',
  'touch',
  'tooltipPlacementLeft',
  'tooltipPlacementRight',
  'tooltipPlacementTop',
  'tooltipPlacementBottom',
  'arrow',
]);

export default tooltipClasses;
