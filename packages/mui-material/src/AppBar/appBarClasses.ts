import { unstable_generateUtilityClasses as generateUtilityClasses } from '@mui/utils';
import generateUtilityClass from '../generateUtilityClass';

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
]);

export default appBarClasses;
