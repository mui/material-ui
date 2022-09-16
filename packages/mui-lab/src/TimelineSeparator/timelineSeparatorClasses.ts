import {
  unstable_generateUtilityClass as generateUtilityClass,
  unstable_generateUtilityClasses as generateUtilityClasses,
} from '@mui/utils';

export interface TimelineSeparatorClasses {
  /** Styles applied to the root element. */
  root: string;
}

export type TimelineSeparatorClassKey = keyof TimelineSeparatorClasses;

export function getTimelineSeparatorUtilityClass(slot: string): string {
  return generateUtilityClass('MuiTimelineSeparator', slot);
}

const timelineSeparatorClasses: TimelineSeparatorClasses = generateUtilityClasses(
  'MuiTimelineSeparator',
  ['root'],
);

export default timelineSeparatorClasses;
