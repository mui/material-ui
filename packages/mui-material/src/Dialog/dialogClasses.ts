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
  /** Styles applied to the Paper component if `scroll="paper"`.
   * @deprecated Combine the [.MuiDialog-paper](/material-ui/api/dialog/#Dialog-css-MuiDialog-paper) and [.MuiDialog-scrollPaper](/material-ui/api/dialog/#dialog-classes-MuiDialog-scrollPaper) classes instead. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  paperScrollPaper: string;
  /** Styles applied to the Paper component if `scroll="body"`.
   * @deprecated Combine the [.MuiDialog-paper](/material-ui/api/dialog/#Dialog-css-MuiDialog-paper) and [.MuiDialog-scrollBody](/material-ui/api/dialog/#dialog-classes-MuiDialog-scrollBody) classes instead. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
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
