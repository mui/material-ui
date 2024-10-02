import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';

export interface LinearProgressClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root and bar2 element if `color="primary"`; bar2 if `variant="buffer"`. */
  colorPrimary: string;
  /** Styles applied to the root and bar2 elements if `color="secondary"`; bar2 if `variant="buffer"`. */
  colorSecondary: string;
  /** Styles applied to the root element if `variant="determinate"`. */
  determinate: string;
  /** Styles applied to the root element if `variant="indeterminate"`. */
  indeterminate: string;
  /** Styles applied to the root element if `variant="buffer"`. */
  buffer: string;
  /** Styles applied to the root element if `variant="query"`. */
  query: string;
  /** Styles applied to the additional bar element if `variant="buffer"`. */
  dashed: string;
  /** Styles applied to the additional bar element if `variant="buffer"` and `color="primary"`. */
  dashedColorPrimary: string;
  /** Styles applied to the additional bar element if `variant="buffer"` and `color="secondary"`. */
  dashedColorSecondary: string;
  /** Styles applied to the layered bar1 and bar2 elements. */
  bar: string;
  /** Styles applied to the bar elements if `color="primary"`; bar2 if `variant` not "buffer". */
  barColorPrimary: string;
  /** Styles applied to the bar elements if `color="secondary"`; bar2 if `variant` not "buffer". */
  barColorSecondary: string;
  /** Styles applied to the bar1 element if `variant="indeterminate or query"`. */
  bar1Indeterminate: string;
  /** Styles applied to the bar1 element if `variant="determinate"`. */
  bar1Determinate: string;
  /** Styles applied to the bar1 element if `variant="buffer"`. */
  bar1Buffer: string;
  /** Styles applied to the bar2 element if `variant="indeterminate or query"`. */
  bar2Indeterminate: string;
  /** Styles applied to the bar2 element if `variant="buffer"`. */
  bar2Buffer: string;
}

export type LinearProgressClassKey = keyof LinearProgressClasses;

export function getLinearProgressUtilityClass(slot: string): string {
  return generateUtilityClass('MuiLinearProgress', slot);
}

const linearProgressClasses: LinearProgressClasses = generateUtilityClasses('MuiLinearProgress', [
  'root',
  'colorPrimary',
  'colorSecondary',
  'determinate',
  'indeterminate',
  'buffer',
  'query',
  'dashed',
  'dashedColorPrimary',
  'dashedColorSecondary',
  'bar',
  'barColorPrimary',
  'barColorSecondary',
  'bar1Indeterminate',
  'bar1Determinate',
  'bar1Buffer',
  'bar2Indeterminate',
  'bar2Buffer',
]);

export default linearProgressClasses;
