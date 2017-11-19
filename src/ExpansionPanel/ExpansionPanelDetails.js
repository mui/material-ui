// @flow weak

import React from 'react';
import type { Node } from 'react';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';

export const styles = (theme: Object) => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
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
   * The content of the expansion panel details.
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

function ExpansionPanelDetails(props: ProvidedProps & Props) {
  const { classes, children, className, ...other } = props;

  return (
    <div className={classNames(classes.root, className)} {...other}>
      {children}
    </div>
  );
}

export default withStyles(styles, { name: 'MuiExpansionPanelDetails' })(ExpansionPanelDetails);
