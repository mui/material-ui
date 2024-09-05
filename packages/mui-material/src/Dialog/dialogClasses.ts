import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';

export interface DialogClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the container element if `scroll="paper"`. */
  scrollPaper: string;
  /** Styles applied to the container element if `scroll="body"`. */
  scrollBody: string;
  /** Styles applied to the container element. */
  container: string;
  /** Styles applied to the Paper component. */
  paper: string;
  /** Styles applied to the Paper component if `scroll="paper"`. */
  paperScrollPaper: string;
  /** Styles applied to the Paper component if `scroll="body"`. */
  paperScrollBody: string;
  /** Styles applied to the Paper component if `maxWidth=false`. */
  paperWidthFalse: string;
  /** Styles applied to the Paper component if `maxWidth="xs"`. */
  paperWidthXs: string;
  /** Styles applied to the Paper component if `maxWidth="sm"`. */
  paperWidthSm: string;
  /** Styles applied to the Paper component if `maxWidth="md"`. */
  paperWidthMd: string;
  /** Styles applied to the Paper component if `maxWidth="lg"`. */
  paperWidthLg: string;
  /** Styles applied to the Paper component if `maxWidth="xl"`. */
  paperWidthXl: string;
  /** Styles applied to the Paper component if `fullWidth={true}`. */
  paperFullWidth: string;
  /** Styles applied to the Paper component if `fullScreen={true}`. */
  paperFullScreen: string;
}

export type DialogClassKey = keyof DialogClasses;

export function getDialogUtilityClass(slot: string): string {
  return generateUtilityClass('MuiDialog', slot);
}

const dialogClasses: DialogClasses = generateUtilityClasses('MuiDialog', [
  'root',
  'scrollPaper',
  'scrollBody',
  'container',
  'paper',
  'paperScrollPaper',
  'paperScrollBody',
  'paperWidthFalse',
  'paperWidthXs',
  'paperWidthSm',
  'paperWidthMd',
  'paperWidthLg',
  'paperWidthXl',
  'paperFullWidth',
  'paperFullScreen',
]);

export default dialogClasses;
