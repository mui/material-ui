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
  /**
   * @ignore
   */
  theme?: Object,
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

class Toolbar extends React.Component<ProvidedProps & Props> {
  static defaultProps = {
    disableGutters: false,
  };

  render() {
    const { children, classes, className: classNameProp, disableGutters, ...other } = this.props;

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
}

export default withStyles(styles, { name: 'MuiToolbar' })(Toolbar);
