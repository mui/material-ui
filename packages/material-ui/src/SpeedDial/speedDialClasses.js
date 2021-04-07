import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getSpeedDialUtilityClass(slot) {
  return generateUtilityClass('MuiSpeedDial', slot);
}

const speedDialClasses = generateUtilityClasses('MuiSpeedDial', [
  'root',
  'fab',
  'directionUp',
  'directionDown',
  'directionLeft',
  'directionRight',
  'actions',
  'actionsClosed',
]);

export default speedDialClasses;
