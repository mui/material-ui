export interface BackdropClasses {
  root: string;
  invisible: string;
}

declare const backdropClasses: BackdropClasses;

export function getBackdropUtilityClass(slot: string): string;

export default backdropClasses;
