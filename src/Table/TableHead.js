import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';

const styles = {
  root: {
    display: 'table-header-group',
  },
};

class TableHead extends React.Component {
  getChildContext() {
    // eslint-disable-line class-methods-use-this
    return {
      table: {
        head: true,
      },
    };
  }

  render() {
    const { classes, className: classNameProp, component: Component, ...other } = this.props;

    return <Component className={classNames(classes.root, classNameProp)} {...other} />;
  }
}

TableHead.propTypes = {
  /**
   * The content of the component, normally `TableRow`.
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

TableHead.defaultProps = {
  component: 'thead',
};

TableHead.childContextTypes = {
  table: PropTypes.object,
};

export default withStyles(styles, { name: 'MuiTableHead' })(TableHead);
