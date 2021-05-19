import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getPaperUtilityClass(slot) {
  return generateUtilityClass('MuiPaper', slot);
}

const paperClasses = generateUtilityClasses('MuiPaper', [
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
