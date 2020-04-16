import { StandardProps } from '..';

export interface ListItemIconProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, ListItemIconClassKey> {
  /**
   * The content of the component, normally `Icon`, `SvgIcon`,
   * or a `@material-ui/icons` SVG icon element.
   */
  children?: React.ReactNode;
}

export type ListItemIconClassKey = 'root';

/**
 * A simple wrapper to apply `List` styles to an `Icon` or `SvgIcon`.
 * Demos:
 *
 * - [Lists](https://material-ui.com/components/lists/)
 *
 * API:
 *
 * - [ListItemIcon API](https://material-ui.com/api/list-item-icon/)
 */
export default function ListItemIcon(props: ListItemIconProps): JSX.Element;
