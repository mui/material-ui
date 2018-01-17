import React from 'react';
import PropTypes from 'prop-types';

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
    const { component: Component, ...other } = this.props;

    return <Component {...other} />;
  }
}

TableBody.propTypes = {
  /**
   * The content of the component, normally `TableRow`.
   */
  children: PropTypes.node.isRequired,
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

export default TableBody;
