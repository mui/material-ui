export interface CircularProgressClasses {
  root: string;
  determinate: string;
  indeterminate: string;
  colorPrimary: string;
  colorSecondary: string;
  svg: string;
  circle: string;
  circleDeterminate: string;
  circleIndeterminate: string;
  circleDisableShrink: string;
}

declare const circularProgressClasses: CircularProgressClasses;

export function getCircularProgressUtilityClass(slot: string): string;

export default circularProgressClasses;
