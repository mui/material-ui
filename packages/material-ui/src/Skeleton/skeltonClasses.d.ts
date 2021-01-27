export interface SkeltonClasses {
  root: string;
  text: string;
  rectangular: string;
  circular: string;
  pulse: string;
  wave: string;
  withChildren: string;
  fitContent: string;
  heightAuto: string;
}

declare const skeltonClasses: SkeltonClasses;

export function getSkeltonUtilityClass(slot: string): string;

export default skeltonClasses;
