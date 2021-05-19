import * as React from 'react';
import { SxProps } from '@material-ui/system';
import { InternalStandardProps as StandardProps, Theme } from '..';

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
    /** Styles applied to the root element. */
    root?: string;
    /** Styles applied to the root element when the parent `ListItem` uses `alignItems="flex-start"`. */
    alignItemsFlexStart?: string;
  };
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
}

export type ListItemIconClassKey = keyof NonNullable<ListItemIconProps['classes']>;

/**
 * A simple wrapper to apply `List` styles to an `Icon` or `SvgIcon`.
 *
 * Demos:
 *
 * - [Lists](https://material-ui.com/components/lists/)
 *
 * API:
 *
 * - [ListItemIcon API](https://material-ui.com/api/list-item-icon/)
 */
export default function ListItemIcon(props: ListItemIconProps): JSX.Element;
