import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';

const styles = {
  root: {
    display: 'table-row-group',
  },
};

class TableBody extends React.Component {
  getChildContext() {
    // eslint-disable-line class-methods-use-this
    return {
      table: {
        body: true,
      },
    };
  }

  render() {
    const { classes, className: classNameProp, component: Component, ...other } = this.props;

    return <Component className={classNames(classes.root, classNameProp)} {...other} />;
  }
}

TableBody.propTypes = {
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

TableBody.defaultProps = {
  component: 'tbody',
};

TableBody.childContextTypes = {
  table: PropTypes.object,
};

export default withStyles(styles, { name: 'MuiTableBody' })(TableBody);
