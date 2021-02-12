export interface ToggleButtonGroupClasses {
  root: string;
  vertical: string;
  grouped: string;
  groupedHorizontal: string;
  groupedVertical: string;
}

declare const toggleButtonGroupClasses: ToggleButtonGroupClasses;

export function getToggleButtonGroupUtilityClass(slot: string): string;

export default toggleButtonGroupClasses;
