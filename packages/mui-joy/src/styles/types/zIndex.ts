/**
 * From lowest to highest value
 */
export interface ZIndex {
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
}
