import { unstable_generateUtilityClasses as generateUtilityClasses } from '@mui/utils';
import generateUtilityClass from '../generateUtilityClass';

export interface PaperClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element unless `square={true}`. */
  rounded: string;
  /** Styles applied to the root element if `variant="outlined"`. */
  outlined: string;
  /** Styles applied to the root element if `variant="elevation"`. */
  elevation: string;
  elevation0: string;
  elevation1: string;
  elevation2: string;
  elevation3: string;
  elevation4: string;
  elevation5: string;
  elevation6: string;
  elevation7: string;
  elevation8: string;
  elevation9: string;
  elevation10: string;
  elevation11: string;
  elevation12: string;
  elevation13: string;
  elevation14: string;
  elevation15: string;
  elevation16: string;
  elevation17: string;
  elevation18: string;
  elevation19: string;
  elevation20: string;
  elevation21: string;
  elevation22: string;
  elevation23: string;
  elevation24: string;
}

export type PaperClassKey = keyof PaperClasses;

export function getPaperUtilityClass(slot: string): string {
  return generateUtilityClass('MuiPaper', slot);
}

const paperClasses: PaperClasses = generateUtilityClasses('MuiPaper', [
  'root',
  'rounded',
  'outlined',
  'elevation',
  'elevation0',
  'elevation1',
  'elevation2',
  'elevation3',
  'elevation4',
  'elevation5',
  'elevation6',
  'elevation7',
  'elevation8',
  'elevation9',
  'elevation10',
  'elevation11',
  'elevation12',
  'elevation13',
  'elevation14',
  'elevation15',
  'elevation16',
  'elevation17',
  'elevation18',
  'elevation19',
  'elevation20',
  'elevation21',
  'elevation22',
  'elevation23',
  'elevation24',
]);

export default paperClasses;
