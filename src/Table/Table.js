// @flow weak

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';

export const styles = (theme: Object) => ({
  root: {
    fontFamily: theme.typography.fontFamily,
    width: '100%',
    borderCollapse: 'collapse',
    borderSpacing: 0,
    overflow: 'hidden',
  },
});

class Table extends Component {
  getChildContext() {
    // eslint-disable-line class-methods-use-this
    return {
      table: {},
    };
  }

  render() {
    const { classes, className: classNameProp, children, component, ...other } = this.props;
    const className = classNames(classes.root, classNameProp);
    const ComponentTable = component;

    return (
      <ComponentTable className={className} {...other}>
        {children}
      </ComponentTable>
    );
  }
}

Table.propTypes = {
  /**
   * The content of the table, normally `TableHeader` and `TableBody`.
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
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: PropTypes.string,
};

Table.childContextTypes = {
  table: PropTypes.object,
};

Table.defaultProps = {
  component: 'table',
};

export default withStyles(styles, { name: 'MuiTable' })(Table);
