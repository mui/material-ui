import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';

export interface AppBarClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if `position="fixed"`. */
  positionFixed: string;
  /** Styles applied to the root element if `position="absolute"`. */
  positionAbsolute: string;
  /** Styles applied to the root element if `position="sticky"`. */
  positionSticky: string;
  /** Styles applied to the root element if `position="static"`. */
  positionStatic: string;
  /** Styles applied to the root element if `position="relative"`. */
  positionRelative: string;
  /** Styles applied to the root element if `color="default"`. */
  colorDefault: string;
  /** Styles applied to the root element if `color="primary"`. */
  colorPrimary: string;
  /** Styles applied to the root element if `color="secondary"`. */
  colorSecondary: string;
  /** Styles applied to the root element if `color="inherit"`. */
  colorInherit: string;
  /** Styles applied to the root element if `color="transparent"`. */
  colorTransparent: string;
  /** Styles applied to the root element if `color="error"`. */
  colorError: string;
  /** Styles applied to the root element if `color="info"`. */
  colorInfo: string;
  /** Styles applied to the root element if `color="success"`. */
  colorSuccess: string;
  /** Styles applied to the root element if `color="warning"`. */
  colorWarning: string;
}

export type AppBarClassKey = keyof AppBarClasses;

export function getAppBarUtilityClass(slot: string): string {
  return generateUtilityClass('MuiAppBar', slot);
}

const appBarClasses: AppBarClasses = generateUtilityClasses('MuiAppBar', [
  'root',
  'positionFixed',
  'positionAbsolute',
  'positionSticky',
  'positionStatic',
  'positionRelative',
  'colorDefault',
  'colorPrimary',
  'colorSecondary',
  'colorInherit',
  'colorTransparent',
  'colorError',
  'colorInfo',
  'colorSuccess',
  'colorWarning',
]);

export default appBarClasses;
