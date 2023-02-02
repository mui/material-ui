import { generateUtilityClass, generateUtilityClasses } from '../className';

export interface TableClasses {
  /** Styles applied to the root element. */
  root: string;
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
  /** Styles applied to the root element when color inversion is triggered. */
  colorContext: string;
  /** Styles applied to the root element if `variant="plain"`. */
  variantPlain: string;
  /** Styles applied to the root element if `variant="outlined"`. */
  variantOutlined: string;
  /** Styles applied to the root element if `variant="soft"`. */
  variantSoft: string;
  /** Styles applied to the root element if `variant="solid"`. */
  variantSolid: string;
  /** Styles applied to the root element if `size="sm"`. */
  sizeSm: string;
  /** Styles applied to the root element if `size="md"`. */
  sizeMd: string;
  /** Styles applied to the root element if `size="lg"`. */
  sizeLg: string;
  /** Styles applied to the root element if `stickyHeader` is true. */
  stickyHeader: string;
  /** Styles applied to the root element if `noWrap` is true. */
  noWrap: string;
  /** Styles applied to the root element if `hoverRow` is true. */
  hoverRow: string;
  /** Styles applied to the root element if `borderAxis="none"`. */
  borderAxisNone: string;
  /** Styles applied to the root element if `borderAxis="x"`. */
  borderAxisX: string;
  /** Styles applied to the root element if `borderAxis="xBetween"`. */
  borderAxisXBetween: string;
  /** Styles applied to the root element if `borderAxis="y"`. */
  borderAxisY: string;
  /** Styles applied to the root element if `borderAxis="yBetween"`. */
  borderAxisYBetween: string;
  /** Styles applied to the root element if `borderAxis="both"`. */
  borderAxisBoth: string;
  /** Styles applied to the root element if `borderAxis="bothBetween"`. */
  borderAxisBothBetween: string;
}

export type TableClassKey = keyof TableClasses;

export function getTableUtilityClass(slot: string): string {
  return generateUtilityClass('JoyTable', slot);
}

const tableClasses: TableClasses = generateUtilityClasses('JoyTable', [
  'root',
  'colorPrimary',
  'colorNeutral',
  'colorDanger',
  'colorInfo',
  'colorSuccess',
  'colorWarning',
  'colorContext',
  'variantPlain',
  'variantOutlined',
  'variantSoft',
  'variantSolid',
  'sizeSm',
  'sizeMd',
  'sizeLg',
  'stickyHeader',
  'noWrap',
  'hoverRow',
  'borderAxisNone',
  'borderAxisX',
  'borderAxisXBetween',
  'borderAxisY',
  'borderAxisYBetween',
  'borderAxisBoth',
  'borderAxisBothBetween',
]);

export default tableClasses;
