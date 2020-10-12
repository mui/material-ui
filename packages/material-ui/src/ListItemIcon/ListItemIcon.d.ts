import { InternalStandardProps as StandardProps } from '..';

export interface ListItemIconProps extends StandardProps<React.HTMLAttributes<HTMLDivElement>> {
  /**
   * The content of the component, normally `Icon`, `SvgIcon`,
   * or a `@material-ui/icons` SVG icon element.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: {
    root?: string;
    alignItemsFlexStart?: string;
  };
}

export type ListItemIconClassKey = keyof NonNullable<ListItemIconProps['classes']>;

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
