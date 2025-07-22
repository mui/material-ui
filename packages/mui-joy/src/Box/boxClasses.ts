import generateUtilityClasses from '@mui/utils/generateUtilityClasses';

export interface BoxClasses {
  /** Class name applied to the root element. */
  root: string;
}

export type BoxClassKey = keyof BoxClasses;

const boxClasses: BoxClasses = generateUtilityClasses('MuiBox', ['root']);

export default boxClasses;
