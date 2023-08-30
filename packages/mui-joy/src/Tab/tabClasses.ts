import { generateUtilityClass, generateUtilityClasses } from '../className';

export interface TabClasses {
  /** Class name applied to the root element. */
  root: string;
  /** Class name applied to the root element if `disabled={true}`. */
  disabled: string;
  /** Class name applied to the root element when its focus is visible. */
  focusVisible: string;
  /** Class name applied to the root element when it is selected. */
  selected: string;
  /** Class name applied to the root element if `orientation="horizontal"`. */
  horizontal: string;
  /** Class name applied to the root element if `orientation="vertical"`. */
  vertical: string;
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
}

export type TabClassKey = keyof TabClasses;

export function getTabUtilityClass(slot: string): string {
  return generateUtilityClass('MuiTab', slot);
}

const tabListClasses: TabClasses = generateUtilityClasses('MuiTab', [
  'root',
  'disabled',
  'focusVisible',
  'selected',
  'horizontal',
  'vertical',
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
]);

export default tabListClasses;
