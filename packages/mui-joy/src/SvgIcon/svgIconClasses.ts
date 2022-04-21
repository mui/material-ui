import { generateUtilityClass, generateUtilityClasses } from '@mui/base';

export interface SvgIconClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if `palette="inherit"`. */
  paletteInherit: string;
  /** Styles applied to the root element if `palette="primary"`. */
  palettePrimary: string;
  /** Styles applied to the root element if `palette="neutral"`. */
  paletteNeutral: string;
  /** Styles applied to the root element if `palette="danger"`. */
  paletteDanger: string;
  /** Styles applied to the root element if `palette="info"`. */
  paletteInfo: string;
  /** Styles applied to the root element if `palette="success"`. */
  paletteSuccess: string;
  /** Styles applied to the root element if `palette="warning"`. */
  paletteWarning: string;
  /** Styles applied to the root element if `fontSize="inherit"`. */
  fontSizeInherit: string;
  /** Styles applied to the root element if `fontSize="xs"`. */
  fontSizeXs: string;
  /** Styles applied to the root element if `fontSize="sm"`. */
  fontSizeSm: string;
  /** Styles applied to the root element if `fontSize="md"`. */
  fontSizeMd: string;
  /** Styles applied to the root element if `fontSize="lg"`. */
  fontSizeLg: string;
  /** Styles applied to the root element if `fontSize="xl"`. */
  fontSizeXl: string;
  /** Styles applied to the root element if `fontSize="xl2"`. */
  fontSizeXl2: string;
  /** Styles applied to the root element if `fontSize="xl3"`. */
  fontSizeXl3: string;
  /** Styles applied to the root element if `fontSize="xl4"`. */
  fontSizeXl4: string;
  /** Styles applied to the root element if `fontSize="xl5"`. */
  fontSizeXl5: string;
  /** Styles applied to the root element if `fontSize="xl6"`. */
  fontSizeXl6: string;
}

export type SvgIconClassKey = keyof SvgIconClasses;

export function getSvgIconUtilityClass(slot: string): string {
  return generateUtilityClass('MuiSvgIcon', slot);
}

const svgIconClasses: SvgIconClasses = generateUtilityClasses('MuiSvgIcon', [
  'root',
  'paletteInherit',
  'palettePrimary',
  'paletteNeutral',
  'paletteDanger',
  'paletteInfo',
  'paletteSuccess',
  'paletteWarning',
  'fontSizeInherit',
  'fontSizeXs',
  'fontSizeSm',
  'fontSizeMd',
  'fontSizeLg',
  'fontSizeXl',
  'fontSizeXl2',
  'fontSizeXl3',
  'fontSizeXl4',
  'fontSizeXl5',
  'fontSizeXl6',
]);

export default svgIconClasses;
