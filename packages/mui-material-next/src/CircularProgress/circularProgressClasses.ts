import {
  unstable_generateUtilityClasses as generateUtilityClasses,
  unstable_generateUtilityClass as generateUtilityClass,
} from '@mui/utils';

export interface CircularProgressClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if `variant="determinate"`. */
  determinate: string;
  /** Styles applied to the root element if `variant="indeterminate"`. */
  indeterminate: string;
  /** Styles applied to the root element if `color="primary"`. */
  colorPrimary: string;
  /** Styles applied to the root element if `color="secondary"`. */
  colorSecondary: string;
  /** Styles applied to the root element if `color="tertiary"`. */
  colorTertiary: string;
  /** Styles applied to the root element if `fourColor={true}`. */
  fourColor: string;
  /** Styles applied to the root element if `disableShrink={true}`. */
  disableShrink: string;
  /** Styles applied to the svg element. */
  svg: string;
  /** Styles applied to the `circle` svg path. */
  circle: string;
}

export type CircularProgressClassKey = keyof CircularProgressClasses;

export function getCircularProgressUtilityClass(slot: string): string {
  return generateUtilityClass('MuiCircularProgress', slot);
}

const circularProgressClasses: CircularProgressClasses = generateUtilityClasses(
  'MuiCircularProgress',
  [
    'root',
    'determinate',
    'indeterminate',
    'colorPrimary',
    'colorSecondary',
    'colorTertiary',
    'fourColor',
    'disableShrink',
    'svg',
    'circle',
  ],
);

export default circularProgressClasses;
