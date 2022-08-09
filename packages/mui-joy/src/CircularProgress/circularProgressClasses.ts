import { generateUtilityClass, generateUtilityClasses } from '../className';

export interface CircularProgressClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if `variant="determinate"`. */
  determinate: string;
  /** Styles applied to the root element if `variant="indeterminate"`. */
  indeterminate: string;
  /** Styles applied to the svg element. */
  svg: string;
  /** Styles applied to the `circle` svg path. */
  circle: string;
  /** Styles applied to the `circle` svg path if `variant="determinate"`. */
  circleDeterminate: string;
  /** Styles applied to the `circle` svg path if `variant="indeterminate"`. */
  circleIndeterminate: string;
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
  /** Styles applied to the root element if `size="sm"`. */
  sizeSm: string;
  /** Styles applied to the root element if `size="md"`. */
  sizeMd: string;
  /** Styles applied to the root element if `size="lg"`. */
  sizeLg: string;
}

export type CircularProgressClassKey = keyof CircularProgressClasses;

export function getCircularProgressUtilityClass(slot: string): string {
  return generateUtilityClass('JoyCircularProgress', slot);
}

const circularProgressClasses: CircularProgressClasses = generateUtilityClasses(
  'JoyCircularProgress',
  [
    'root',
    'determinate',
    'indeterminate',
    'svg',
    'circle',
    'circleDeterminate',
    'circleIndeterminate',
    'colorPrimary',
    'colorNeutral',
    'colorDanger',
    'colorInfo',
    'colorSuccess',
    'colorWarning',
    'sizeSm',
    'sizeMd',
    'sizeLg',
  ],
);

export default circularProgressClasses;
