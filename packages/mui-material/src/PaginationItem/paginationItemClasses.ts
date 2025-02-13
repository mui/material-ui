import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';

export interface PaginationItemClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if `type="page"`. */
  page: string;
  /** Styles applied to the root element if `size="small"`. */
  sizeSmall: string;
  /** Styles applied to the root element if `size="large"`. */
  sizeLarge: string;
  /** Styles applied to the root element if `variant="text"`. */
  text: string;
  /** Styles applied to the root element if `variant="text"` and `color="primary"`.
   *  @deprecated Combine the [.MuiPaginationItem-text](/material-ui/api/pagination-item/#pagination-item-classes-text) and [.MuiPaginationItem-colorPrimary](/material-ui/api/pagination-item/#pagination-item-classes-colorPrimary) classes instead. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  textPrimary: string;
  /** Styles applied to the root element if `variant="text"` and `color="secondary"`.
   *  @deprecated Combine the [.MuiPaginationItem-text](/material-ui/api/pagination-item/#pagination-item-classes-text) and [.MuiPaginationItem-colorSecondary](/material-ui/api/pagination-item/#pagination-item-classes-colorSecondary) classes instead. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  textSecondary: string;
  /** Styles applied to the root element if `variant="outlined"`. */
  outlined: string;
  /** Styles applied to the root element if `variant="outlined"` and `color="primary"`.
   * @deprecated Combine the [.MuiPaginationItem-outlined](/material-ui/api/pagination-item/#pagination-item-classes-outlined) and [.MuiPaginationItem-colorPrimary](/material-ui/api/pagination-item/#pagination-item-classes-colorPrimary) classes instead. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  outlinedPrimary: string;
  /** Styles applied to the root element if `variant="outlined"` and `color="secondary"`.
   * @deprecated Combine the [.MuiPaginationItem-outlined](/material-ui/api/pagination-item/#pagination-item-classes-outlined) and [.MuiPaginationItem-colorSecondary](/material-ui/api/pagination-item/#pagination-item-classes-colorSecondary) classes instead. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  outlinedSecondary: string;
  /** Styles applied to the root element if `rounded="true"`. */
  rounded: string;
  /** Styles applied to the root element if `type="start-ellipsis"` or `type="end-ellipsis"`. */
  ellipsis: string;
  /** Styles applied to the root element if `type="first"` or type="last". */
  firstLast: string;
  /** Styles applied to the root element if `type="previous"` or type="next". */
  previousNext: string;
  /** State class applied to the root element if keyboard focused. */
  focusVisible: string;
  /** State class applied to the root element if `disabled={true}`. */
  disabled: string;
  /** State class applied to the root element if `selected={true}`. */
  selected: string;
  /** Styles applied to the icon to display. */
  icon: string;
  /** Styles applied to the root element if `color="primary"`. */
  colorPrimary: string;
  /** Styles applied to the root element if `color="secondary"`. */
  colorSecondary: string;
}

export type PaginationItemClassKey = keyof PaginationItemClasses;

export function getPaginationItemUtilityClass(slot: string): string {
  return generateUtilityClass('MuiPaginationItem', slot);
}

const paginationItemClasses: PaginationItemClasses = generateUtilityClasses('MuiPaginationItem', [
  'root',
  'page',
  'sizeSmall',
  'sizeLarge',
  'text',
  'textPrimary',
  'textSecondary',
  'outlined',
  'outlinedPrimary',
  'outlinedSecondary',
  'rounded',
  'ellipsis',
  'firstLast',
  'previousNext',
  'focusVisible',
  'disabled',
  'selected',
  'icon',
  'colorPrimary',
  'colorSecondary',
]);

export default paginationItemClasses;
