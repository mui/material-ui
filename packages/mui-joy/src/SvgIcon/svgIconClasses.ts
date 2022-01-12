import { generateUtilityClass, generateUtilityClasses } from '@mui/base';

export interface SvgIconClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if `color="inherit"`. */
  colorInherit: string;
  /** Styles applied to the root element if `color="primary"`. */
  colorPrimary: string;
  /** Styles applied to the root element if `color="neutral"`. */
  colorNeutral: string;
  /** Styles applied to the root element if `color="danger"`. */
  colorDanger: string;
  /** Styles applied to the root element if `color="info"`. */
  colorInfo: string;
  /** Styles applied to the root element if `color="success"`. */
  colorSuccess: string;
  /** Styles applied to the root element if `color="warning"`. */
  colorWarning: string;
  /** Styles applied to the root element if `fontSize="inherit"`. */
  fontSizeInherit: string;
  /** Styles applied to the root element if `fontSize="extraSmall"`. */
  fontSizeExtraSmall: string;
  /** Styles applied to the root element if `fontSize="small"`. */
  fontSizeSmall: string;
  /** Styles applied to the root element if `fontSize="large"`. */
  fontSizeMedium: string;
  /** Styles applied to the root element if `fontSize="extraLarge"`. */
  fontSizeExtraLarge: string;
  /** Styles applied to the root element if `fontSize="large"`. */
  fontSizeLarge: string;
}

export type SvgIconClassKey = keyof SvgIconClasses;

export function getSvgIconUtilityClass(slot: string): string {
  return generateUtilityClass('MuiSvgIcon', slot);
}

const svgIconClasses: SvgIconClasses = generateUtilityClasses('MuiSvgIcon', [
  'root',
  'colorInherit',
  'colorPrimary',
  'colorNeutral',
  'colorDanger',
  'colorInfo',
  'colorSuccess',
  'colorWarning',
  'fontSizeInherit',
  'fontSizeExtraSmall',
  'fontSizeSmall',
  'fontSizeMedium',
  'fontSizeExtraLarge',
  'fontSizeLarge',
]);

export default svgIconClasses;
