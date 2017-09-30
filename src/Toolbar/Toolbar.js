// @flow weak

import React from 'react';
import type { Node } from 'react';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';

export const styles = (theme: Object) => ({
  root: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    ...theme.mixins.toolbar,
  },
  gutters: theme.mixins.gutters({}),
});

type ProvidedProps = {
  classes: Object,
};

export type Props = {
  /**
   * Useful to extend the style applied to components.
   */
  classes?: Object,
  /**
   * Toolbar children, usually a mixture of `IconButton`, `Button` and `Typography`.
   */
  children?: Node,
  /**
   * @ignore
   */
  className?: string,
  /**
   * If `true`, disables gutter padding.
   */
  disableGutters?: boolean,
};

function Toolbar(props: ProvidedProps & Props) {
  const { children, classes, className: classNameProp, disableGutters, ...other } = props;

  const className = classNames(
    classes.root,
    {
      [classes.gutters]: !disableGutters,
    },
    classNameProp,
  );

  return (
    <div className={className} {...other}>
      {children}
    </div>
  );
}

Toolbar.defaultProps = {
  disableGutters: false,
};

export default withStyles(styles, { name: 'MuiToolbar' })(Toolbar);
