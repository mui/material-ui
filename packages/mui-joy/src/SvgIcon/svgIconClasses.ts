import { generateUtilityClass, generateUtilityClasses } from '../className';

export interface SvgIconClasses {
  /** Class name applied to the root element. */
  root: string;
  /** Class name applied to the root element if `color="inherit"`. */
  colorInherit: string;
  /** Class name applied to the root element if `color="primary"`. */
  colorPrimary: string;
  /** Class name applied to the root element if `color="neutral"`. */
  colorNeutral: string;
  /** Class name applied to the root element if `color="danger"`. */
  colorDanger: string;
  /** Class name applied to the root element if `color="success"`. */
  colorSuccess: string;
  /** Class name applied to the root element if `color="warning"`. */
  colorWarning: string;
  /** Class name applied to the root element if `fontSize="inherit"`. */
  fontSizeInherit: string;
  /** Class name applied to the root element if `fontSize="xs"`. */
  fontSizeXs: string;
  /** Class name applied to the root element if `fontSize="sm"`. */
  fontSizeSm: string;
  /** Class name applied to the root element if `fontSize="md"`. */
  fontSizeMd: string;
  /** Class name applied to the root element if `fontSize="lg"`. */
  fontSizeLg: string;
  /** Class name applied to the root element if `fontSize="xl"`. */
  fontSizeXl: string;
  /** Class name applied to the root element if `fontSize="xl2"`. */
  fontSizeXl2: string;
  /** Class name applied to the root element if `fontSize="xl3"`. */
  fontSizeXl3: string;
  /** Class name applied to the root element if `fontSize="xl4"`. */
  fontSizeXl4: string;
  /** Class name applied to the root element if `size="sm"`. */
  sizeSm: string;
  /** Class name applied to the root element if `size="md"`. */
  sizeMd: string;
  /** Class name applied to the root element if `size="lg"`. */
  sizeLg: string;
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
  'sizeSm',
  'sizeMd',
  'sizeLg',
]);

export default svgIconClasses;
