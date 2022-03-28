import { generateUtilityClass, generateUtilityClasses } from '@mui/base';

export interface AspectRatioClasses {
  /** Styles applied to the root element. */
  root: string;
}

export type AspectRatioClassKey = keyof AspectRatioClasses;

export function getAspectRatioUtilityClass(slot: string): string {
  return generateUtilityClass('MuiAspectRatio', slot);
}

const aspectRatioClasses: AspectRatioClasses = generateUtilityClasses('MuiAspectRatio', ['root']);

export default aspectRatioClasses;
