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
  /** Styles applied to the additional bar element if `variant="buffer"` and `color="primary"`.
   * @deprecated Combine the [.MuiLinearProgress-dashed](/material-ui/api/linear-progress/#linear-progress-classes-dashed) and [.MuiLinearProgress-colorPrimary](/material-ui/api/linear-progress/#linear-progress-classes-colorPrimary) classes instead. [How to migrate](/material-ui/migration/migrating-from-deprecated-apis/)
   */
  dashedColorPrimary: string;
  /** Styles applied to the additional bar element if `variant="buffer"` and `color="secondary"`.
   * @deprecated Combine the [.MuiLinearProgress-dashed](/material-ui/api/linear-progress/#linear-progress-classes-dashed) and [.MuiLinearProgress-colorSecondary](/material-ui/api/linear-progress/#linear-progress-classes-colorSecondary) classes instead. [How to migrate](/material-ui/migration/migrating-from-deprecated-apis/)
   */
  dashedColorSecondary: string;
  /** Styles applied to the layered bar1 and bar2 elements. */
  bar: string;
  /** Styles applied to the bar1 element. */
  bar1: string;
  /** Styles applied to the bar2 element. */
  bar2: string;
  /** Styles applied to the bar elements if `color="primary"`; bar2 if `variant` not "buffer".
   * @deprecated Use the [.MuiLinearProgress-bar](/material-ui/api/linear-progress/#linear-progress-classes-bar) and [.MuiLinearProgress-colorPrimary](/material-ui/api/linear-progress/#linear-progress-classes-colorPrimary) classes instead. [How to migrate](/material-ui/migration/migrating-from-deprecated-apis/)
   */
  barColorPrimary: string;
  /** Styles applied to the bar elements if `color="secondary"`; bar2 if `variant` not "buffer".
   * @deprecated Use the [.MuiLinearProgress-bar](/material-ui/api/linear-progress/#linear-progress-classes-bar) and [.MuiLinearProgress-colorSecondary](/material-ui/api/linear-progress/#linear-progress-classes-colorSecondary) classes instead. [How to migrate](/material-ui/migration/migrating-from-deprecated-apis/)
   */
  barColorSecondary: string;
  /** Styles applied to the bar1 element if `variant="indeterminate or query"`.
   * @deprecated Use the [.MuiLinearProgress-bar1](/material-ui/api/linear-progress/#linear-progress-classes-bar1) and [.MuiLinearProgress-indeterminate](/material-ui/api/linear-progress/#linear-progress-classes-indeterminate) classes instead. [How to migrate](/material-ui/migration/migrating-from-deprecated-apis/)
   */
  bar1Indeterminate: string;
  /** Styles applied to the bar1 element if `variant="determinate"`.
   * @deprecated Use the [.MuiLinearProgress-bar1](/material-ui/api/linear-progress/#linear-progress-classes-bar1) and [.MuiLinearProgress-determinate](/material-ui/api/linear-progress/#linear-progress-classes-determinate) classes instead. [How to migrate](/material-ui/migration/migrating-from-deprecated-apis/)
   */
  bar1Determinate: string;
  /** Styles applied to the bar1 element if `variant="buffer"`.
   * @deprecated Use the [.MuiLinearProgress-bar1](/material-ui/api/linear-progress/#linear-progress-classes-bar1) and [.MuiLinearProgress-buffer](/material-ui/api/linear-progress/#linear-progress-classes-buffer) classes instead. [How to migrate](/material-ui/migration/migrating-from-deprecated-apis/)
   */
  bar1Buffer: string;
  /** Styles applied to the bar2 element if `variant="indeterminate or query"`.
   * @deprecated Use the [.MuiLinearProgress-bar2](/material-ui/api/linear-progress/#linear-progress-classes-bar2) and [.MuiLinearProgress-indeterminate](/material-ui/api/linear-progress/#linear-progress-classes-indeterminate) classes instead. [How to migrate](/material-ui/migration/migrating-from-deprecated-apis/)
   */
  bar2Indeterminate: string;
  /** Styles applied to the bar2 element if `variant="buffer"`.
   * @deprecated Use the [.MuiLinearProgress-bar2](/material-ui/api/linear-progress/#linear-progress-classes-bar2) and [.MuiLinearProgress-buffer](/material-ui/api/linear-progress/#linear-progress-classes-buffer) classes instead. [How to migrate](/material-ui/migration/migrating-from-deprecated-apis/)
   */
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
  'bar1',
  'bar2',
  'barColorPrimary',
  'barColorSecondary',
  'bar1Indeterminate',
  'bar1Determinate',
  'bar1Buffer',
  'bar2Indeterminate',
  'bar2Buffer',
]);

export default linearProgressClasses;
