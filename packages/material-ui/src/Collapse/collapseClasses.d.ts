export interface CollapseClasses {
  root: string;
  horizontal: string;
  vertical: string;
  entered: string;
  hidden: string;
  wrapper: string;
  wrapperInner: string;
}

declare const collapseClasses: CollapseClasses;

export function getCollapseUtilityClass(slot: string): string;

export default collapseClasses;
