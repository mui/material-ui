import * as React from 'react';
import { SxProps } from '@mui/system';
import { InternalStandardProps as StandardProps, Theme } from '..';
import { ListItemSecondaryActionClasses } from './listItemSecondaryActionClasses';

export interface ListItemSecondaryActionProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>> {
  /**
   * The content of the component, normally an `IconButton` or selection control.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<ListItemSecondaryActionClasses>;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
}

/**
 * Must be used as the last child of ListItem to function properly.
 *
 * Demos:
 *
 * - [Lists](https://next.mui.com/material-ui/react-list/)
 *
 * API:
 *
 * - [ListItemSecondaryAction API](https://next.mui.com/material-ui/api/list-item-secondary-action/)
 *
 * @deprecated Use the `secondaryAction` prop in the `ListItem` component instead. This component will be removed in v7. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
 */
declare const ListItemSecondaryAction: ((
  props: ListItemSecondaryActionProps,
) => React.JSX.Element) & {
  muiName: string;
};

export default ListItemSecondaryAction;
