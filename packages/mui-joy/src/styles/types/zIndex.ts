import { OverridableRecord } from './utils';

/**
 * From lowest to highest value
 */
export interface DefaultZIndex {
  badge: number;
  /**
   * For sticky `th` cells
   */
  table: number;
  /**
   * Including `Menu`, `Autocomplete`, `Select`
   */
  popup: number;
  modal: number;
  tooltip: number;
  snackbar: number;
}
export interface ZIndexOverrides {}
export interface ZIndex extends OverridableRecord<DefaultZIndex, ZIndexOverrides, number> {}
