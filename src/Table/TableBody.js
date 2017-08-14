// @flow weak

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';

export const styles = (theme: Object) => ({
  root: {
    fontSize: 13,
    color: theme.palette.text.primary,
  },
});

class TableBody extends Component {
  getChildContext() {
    // eslint-disable-line class-methods-use-this
    return {
      table: {
        body: true,
      },
    };
  }

  render() {
    const { classes, className: classNameProp, children, component, ...other } = this.props;
    const className = classNames(classes.root, classNameProp);
    const ComponentBody = component || 'tbody';

    return (
      <ComponentBody className={className} {...other}>
        {children}
      </ComponentBody>
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
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: PropTypes.string,
};

TableBody.contextTypes = {
  table: PropTypes.object,
};

TableBody.childContextTypes = {
  table: PropTypes.object,
};

export default withStyles(styles, { name: 'MuiTableBody' })(TableBody);
