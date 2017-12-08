export interface ZIndex {
  mobileStepper: number;
  menu: number;
  appBar: number;
  drawerOverlay: number;
  navDrawer: number;
  dialogOverlay: number;
  dialog: number;
  layer: number;
  popover: number;
  snackbar: number;
  tooltip: number;
}

export type ZIndexOptions = Partial<ZIndex>;

declare const zIndex: ZIndex;

export default zIndex;
