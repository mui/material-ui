import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';

export const styles = theme => ({
  root: {
    fontFamily: theme.typography.fontFamily,
    width: '100%',
    borderCollapse: 'collapse',
    borderSpacing: 0,
    overflow: 'hidden',
  },
});

class Table extends React.Component {
  getChildContext() {
    // eslint-disable-line class-methods-use-this
    return {
      table: {},
    };
  }

  render() {
    const { classes, className: classNameProp, component: Component, ...other } = this.props;

    return <Component className={classNames(classes.root, classNameProp)} {...other} />;
  }
}

Table.propTypes = {
  /**
   * The content of the table, normally `TableHeader` and `TableBody`.
   */
  children: PropTypes.node.isRequired,
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
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
};

Table.defaultProps = {
  component: 'table',
};

Table.childContextTypes = {
  table: PropTypes.object,
};

export default withStyles(styles, { name: 'MuiTable' })(Table);
