import { generateUtilityClass, generateUtilityClasses } from '../className';

export interface OptionClasses {
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
  /** Styles applied to the root element if `color="context"`. */
  colorContext: string;
  /** State class applied to the root element if `disabled={true}`. */
  disabled: string;
  /** State class applied to the root element if the option is selected. */
  selected: string;
  /** State class applied to the root element if the option is highlighted. */
  highlighted: string;
  /** State class applied to the root element if `variant="plain"`. */
  variantPlain: string;
  /** State class applied to the root element if `variant="soft"`. */
  variantSoft: string;
  /** State class applied to the root element if `variant="outlined"`. */
  variantOutlined: string;
  /** State class applied to the root element if `variant="solid"`. */
  variantSolid: string;
}

export type OptionClassKey = keyof OptionClasses;

export function getOptionUtilityClass(slot: string): string {
  return generateUtilityClass('JoyOption', slot);
}

const optionClasses: OptionClasses = generateUtilityClasses('JoyOption', [
  'root',
  'colorPrimary',
  'colorNeutral',
  'colorDanger',
  'colorInfo',
  'colorSuccess',
  'colorWarning',
  'colorContext',
  'focusVisible',
  'disabled',
  'selected',
  'highlighted',
  'variantPlain',
  'variantSoft',
  'variantOutlined',
  'variantSolid',
]);

export default optionClasses;
