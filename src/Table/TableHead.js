import React from 'react';
import PropTypes from 'prop-types';

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
    const { children, component: ComponentProp, ...other } = this.props;

    return <ComponentProp {...other}>{children}</ComponentProp>;
  }
}

TableHead.propTypes = {
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

TableHead.defaultProps = {
  component: 'thead',
};

TableHead.childContextTypes = {
  table: PropTypes.object,
};

export default TableHead;
