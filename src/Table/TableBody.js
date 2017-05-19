// @flow weak

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import withStyles from '../styles/withStyles';

export const styleSheet = createStyleSheet('MuiTableBody', (theme) => ({
  root: {
    fontSize: 13,
    color: theme.palette.text.primary,
  },
}));

class TableBody extends Component {
  getChildContext() { // eslint-disable-line class-methods-use-this
    return {
      table: {
        body: true,
      },
    };
  }

  render() {
    const {
      classes,
      className: classNameProp,
      children,
      ...other
    } = this.props;
    const className = classNames(classes.root, classNameProp);

    return (
      <tbody className={className} {...other}>
        {children}
      </tbody>
    );
  }
}

TableBody.propTypes = {
  /**
   * The content of the component, normally `TableRow`.
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
};

TableBody.contextTypes = {
  table: PropTypes.object,
};

TableBody.childContextTypes = {
  table: PropTypes.object,
};

export default withStyles(styleSheet)(TableBody);
