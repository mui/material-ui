// @flow weak

import React from 'react';
import type { Node } from 'react';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';

export const styles = (theme: Object) => ({
  root: {
    position: 'absolute',
    right: 4,
    top: '50%',
    marginTop: -theme.spacing.unit * 3,
  },
});

type ProvidedProps = {
  classes: Object,
};

export type Props = {
  /**
   * The content of the component, normally an `IconButton` or selection control.
   */
  children?: Node,
  /**
   * Useful to extend the style applied to components.
   */
  classes?: Object,
  /**
   * @ignore
   */
  className?: string,
};

function ListItemSecondaryAction(props: ProvidedProps & Props) {
  const { children, classes, className } = props;

  return <div className={classNames(classes.root, className)}>{children}</div>;
}

ListItemSecondaryAction.muiName = 'ListItemSecondaryAction';

export default withStyles(styles, { name: 'MuiListItemSecondaryAction' })(ListItemSecondaryAction);
