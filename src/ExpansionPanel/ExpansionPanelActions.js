// @flow

import React from 'react';
import type { Node } from 'react';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import { cloneChildrenWithClassName } from '../utils/reactHelpers';

export const styles = (theme: Object) => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit}px`,
  },
  action: {
    marginLeft: theme.spacing.unit,
  },
});

type ProvidedProps = {
  classes: Object,
  /**
   * @ignore
   */
  theme?: Object,
};

export type Props = {
  /**
   * The content of the component.
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

function ExpansionPanelActions(props: ProvidedProps & Props) {
  const { children, classes, className, ...other } = props;

  return (
    <div className={classNames(classes.root, className)} {...other}>
      {cloneChildrenWithClassName(children, classes.action)}
    </div>
  );
}

export default withStyles(styles, { name: 'MuiExpansionPanelActions' })(ExpansionPanelActions);
