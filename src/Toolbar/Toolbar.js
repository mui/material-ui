// @flow weak

import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';

export const styles = (theme: Object) => ({
  root: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    minHeight: 56,
    [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: {
      minHeight: 48,
    },
    [theme.breakpoints.up('sm')]: {
      minHeight: 64,
    },
  },
  gutters: theme.mixins.gutters({}),
});

function Toolbar(props) {
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

Toolbar.propTypes = {
  /**
   * Can be a `ToolbarGroup` to render a group of related items.
   */
  children: PropTypes.node,
  /**
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * If `true`, disables gutter padding.
   */
  disableGutters: PropTypes.bool,
};

Toolbar.defaultProps = {
  disableGutters: false,
};

export default withStyles(styles, { name: 'MuiToolbar' })(Toolbar);
