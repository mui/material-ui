export interface ToolbarClasses {
  root: string;
  gutters: string;
  regular: string;
  dense: string;
}

declare const toolbarClasses: ToolbarClasses;

export function getToolbarUtilityClass(slot: string): string;

export default toolbarClasses;
