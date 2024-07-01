import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';

export interface SpeedDialActionClasses {
  /** Styles applied to the Fab component. */
  fab: string;
  /** Styles applied to the Fab component if `open={false}`. */
  fabClosed: string;
}

export type SpeedDialActionClassKey = keyof SpeedDialActionClasses;

export function getSpeedDialActionUtilityClass(slot: string): string {
  return generateUtilityClass('MuiSpeedDialAction', slot);
}

const speedDialActionClasses: SpeedDialActionClasses = generateUtilityClasses(
  'MuiSpeedDialAction',
  ['fab', 'fabClosed'],
);

export default speedDialActionClasses;
