// @flow weak

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';

export const styles = (theme: Object) => ({
  root: {
    fontSize: 12,
    fontWeight: theme.typography.fontWeightMedium,
    color: theme.palette.text.secondary,
  },
});

class TableHead extends Component {
  getChildContext() {
    // eslint-disable-line class-methods-use-this
    return {
      table: {
        head: true,
      },
    };
  }

  render() {
    const { classes, className: classNameProp, children, component, ...other } = this.props;
    const className = classNames(classes.root, classNameProp);
    const ComponentHeader = component;

    return (
      <ComponentHeader className={className} {...other}>
        {children}
      </ComponentHeader>
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
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: PropTypes.string,
};

TableHead.contextTypes = {
  table: PropTypes.object,
};

TableHead.childContextTypes = {
  table: PropTypes.object,
};

TableHead.defaultProps = {
  component: 'thead',
};

export default withStyles(styles, { name: 'MuiTableHead' })(TableHead);
