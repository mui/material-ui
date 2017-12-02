import { DeepPartial } from '../index';

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

export type ZIndexOptions = DeepPartial<ZIndex>;

declare const zIndex: ZIndex;

export default zIndex;
