export interface ToolbarClasses {
  root: string;
  dense: string;
  regular: string;
  gutters: string;
}

declare const toolbarClasses: ToolbarClasses;

export function getToolbarUtilityClass(slot: string): string;

export default toolbarClasses;
