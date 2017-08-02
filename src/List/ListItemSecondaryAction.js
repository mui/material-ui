// @flow weak

import React from 'react';
import type { Element } from 'react';
import classNames from 'classnames';
import createStyleSheet from '../styles/createStyleSheet';
import withStyles from '../styles/withStyles';

export const styleSheet = createStyleSheet('MuiListItemSecondaryAction', theme => ({
  root: {
    position: 'absolute',
    right: 4,
    top: '50%',
    marginTop: -theme.spacing.unit * 3,
  },
}));

type DefaultProps = {
  classes: Object,
};

export type Props = DefaultProps & {
  /**
   * The content of the component, normally an `IconButton` or selection control.
   */
  children?: Element<*>,
  /**
   * Useful to extend the style applied to components.
   */
  classes?: Object,
  /**
   * @ignore
   */
  className?: string,
};

function ListItemSecondaryAction(props: Props) {
  const { children, classes, className } = props;

  return (
    <div className={classNames(classes.root, className)}>
      {children}
    </div>
  );
}

ListItemSecondaryAction.muiName = 'ListItemSecondaryAction';

export default withStyles(styleSheet)(ListItemSecondaryAction);
