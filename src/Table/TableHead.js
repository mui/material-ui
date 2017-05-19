// @flow weak

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import withStyles from '../styles/withStyles';

export const styleSheet = createStyleSheet('MuiTableHead', (theme) => ({
  root: {
    fontSize: 12,
    fontWeight: theme.typography.fontWeightMedium,
    color: theme.palette.text.secondary,
  },
}));

class TableHead extends Component {
  getChildContext() { // eslint-disable-line class-methods-use-this
    return {
      table: {
        head: true,
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
      <thead className={className} {...other}>
        {children}
      </thead>
    );
  }
}

TableHead.propTypes = {
  /**
   * Should be valid `<thead>` children such as `TableRow`.
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

TableHead.contextTypes = {
  table: PropTypes.object,
};

TableHead.childContextTypes = {
  table: PropTypes.object,
};

export default withStyles(styleSheet)(TableHead);
