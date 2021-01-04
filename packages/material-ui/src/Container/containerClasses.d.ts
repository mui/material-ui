export interface ContainerClasses {
  root: string;
  disableGutters: string;
  fixed: string;
  maxWidthXs: string;
  maxWidthSm: string;
  maxWidthMd: string;
  maxWidthLg: string;
  maxWidthXl: string;
}

declare const containerClasses: ContainerClasses;

export function getContainerUtilityClass(slot: string): string;

export default containerClasses;
