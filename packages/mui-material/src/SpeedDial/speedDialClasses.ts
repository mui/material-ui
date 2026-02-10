import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';

export interface SpeedDialClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the Fab component. */
  fab: string;
  /** Styles applied to the root element if direction="up" */
  directionUp: string;
  /** Styles applied to the root element if direction="down" */
  directionDown: string;
  /** Styles applied to the root element if direction="left" */
  directionLeft: string;
  /** Styles applied to the root element if direction="right" */
  directionRight: string;
  /** Styles applied to the actions (`children` wrapper) element. */
  actions: string;
  /** Styles applied to the actions (`children` wrapper) element if `open={false}`. */
  actionsClosed: string;
}

export type SpeedDialClassKey = keyof SpeedDialClasses;

export function getSpeedDialUtilityClass(slot: string): string {
  return generateUtilityClass('MuiSpeedDial', slot);
}

const speedDialClasses: SpeedDialClasses = generateUtilityClasses('MuiSpeedDial', [
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
