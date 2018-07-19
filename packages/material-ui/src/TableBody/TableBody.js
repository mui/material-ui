import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';

export const styles = {
  /* Styles applied to the root element. */
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
    const { classes, className, component: Component, ...other } = this.props;

    return <Component className={classNames(classes.root, className)} {...other} />;
  }
}

TableBody.propTypes = {
  /**
   * The content of the component, normally `TableRow`.
   */
  children: PropTypes.node.isRequired,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css-api) below for more details.
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
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object]),
};

TableBody.defaultProps = {
  component: 'tbody',
};

TableBody.childContextTypes = {
  table: PropTypes.object,
};

export default withStyles(styles, { name: 'MuiTableBody' })(TableBody);
