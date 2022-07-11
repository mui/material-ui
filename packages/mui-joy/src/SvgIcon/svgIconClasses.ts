import { generateUtilityClass, generateUtilityClasses } from '../className';

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
  return generateUtilityClass('JoySvgIcon', slot);
}

const svgIconClasses: SvgIconClasses = generateUtilityClasses('JoySvgIcon', [
  'root',
  'colorInherit',
  'colorPrimary',
  'colorNeutral',
  'colorDanger',
  'colorInfo',
  'colorSuccess',
  'colorWarning',
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
