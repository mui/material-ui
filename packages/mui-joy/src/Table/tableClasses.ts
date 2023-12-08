import { generateUtilityClass, generateUtilityClasses } from '../className';

export interface TableClasses {
  /** Class name applied to the root element. */
  root: string;
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
  /** Class name applied to the root element when color inversion is triggered. */
  colorContext: string;
  /** Class name applied to the root element if `variant="plain"`. */
  variantPlain: string;
  /** Class name applied to the root element if `variant="outlined"`. */
  variantOutlined: string;
  /** Class name applied to the root element if `variant="soft"`. */
  variantSoft: string;
  /** Class name applied to the root element if `variant="solid"`. */
  variantSolid: string;
  /** Class name applied to the root element if `size="sm"`. */
  sizeSm: string;
  /** Class name applied to the root element if `size="md"`. */
  sizeMd: string;
  /** Class name applied to the root element if `size="lg"`. */
  sizeLg: string;
  /** Class name applied to the root element if `stickyHeader` is true. */
  stickyHeader: string;
  /** Class name applied to the root element if `stickyFooter` is true. */
  stickyFooter: string;
  /** Class name applied to the root element if `noWrap` is true. */
  noWrap: string;
  /** Class name applied to the root element if `hoverRow` is true. */
  hoverRow: string;
  /** Class name applied to the root element if `borderAxis="none"`. */
  borderAxisNone: string;
  /** Class name applied to the root element if `borderAxis="x"`. */
  borderAxisX: string;
  /** Class name applied to the root element if `borderAxis="xBetween"`. */
  borderAxisXBetween: string;
  /** Class name applied to the root element if `borderAxis="y"`. */
  borderAxisY: string;
  /** Class name applied to the root element if `borderAxis="yBetween"`. */
  borderAxisYBetween: string;
  /** Class name applied to the root element if `borderAxis="both"`. */
  borderAxisBoth: string;
  /** Class name applied to the root element if `borderAxis="bothBetween"`. */
  borderAxisBothBetween: string;
}

export type TableClassKey = keyof TableClasses;

export function getTableUtilityClass(slot: string): string {
  return generateUtilityClass('MuiTable', slot);
}

const tableClasses: TableClasses = generateUtilityClasses('MuiTable', [
  'root',
  'colorPrimary',
  'colorNeutral',
  'colorDanger',
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
  'stickyFooter',
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
