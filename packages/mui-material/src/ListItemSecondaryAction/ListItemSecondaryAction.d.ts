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
 * - [Lists](https://mui.com/components/lists/)
 *
 * API:
 *
 * - [ListItemSecondaryAction API](https://mui.com/api/list-item-secondary-action/)
 */
declare const ListItemSecondaryAction: ((props: ListItemSecondaryActionProps) => JSX.Element) & {
  muiName: string;
};

export default ListItemSecondaryAction;
