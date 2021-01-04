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

declare const ContainerClasses: ContainerClasses;

export function getContainerUtilityClass(slot: string): string;

export default ContainerClasses;
