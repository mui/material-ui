import { generateUtilityClass, generateUtilityClasses } from '../className';

export interface TabClasses {
  /** Classname applied to the root element. */
  root: string;
  /** Classname applied to the root element if `disabled={true}`. */
  disabled: string;
  /** Classname applied to the root element when its focus is visible. */
  focusVisible: string;
  /** Classname applied to the root element when it is selected. */
  selected: string;
  /** Classname applied to the root element if `orientation="horizontal"`. */
  horizontal: string;
  /** Classname applied to the root element if `orientation="vertical"`. */
  vertical: string;
  /** Classname applied to the root element if `color="primary"`. */
  colorPrimary: string;
  /** Classname applied to the root element if `color="neutral"`. */
  colorNeutral: string;
  /** Classname applied to the root element if `color="danger"`. */
  colorDanger: string;
  /** Classname applied to the root element if `color="info"`. */
  colorInfo: string;
  /** Classname applied to the root element if `color="success"`. */
  colorSuccess: string;
  /** Classname applied to the root element if `color="warning"`. */
  colorWarning: string;
  /** Class name applied to the root element when color inversion is triggered. */
  colorContext: string;
  /** Classname applied to the root element if `variant="plain"`. */
  variantPlain: string;
  /** Classname applied to the root element if `variant="outlined"`. */
  variantOutlined: string;
  /** Classname applied to the root element if `variant="soft"`. */
  variantSoft: string;
  /** Classname applied to the root element if `variant="solid"`. */
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
  'colorInfo',
  'colorSuccess',
  'colorWarning',
  'colorContext',
  'variantPlain',
  'variantOutlined',
  'variantSoft',
  'variantSolid',
]);

export default tabListClasses;
