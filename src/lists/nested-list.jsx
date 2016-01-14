import React from 'react';
import {mergeStyles} from '../utils/styles';
import List from './list';


const NestedList = React.createClass({

  propTypes: {
    children: React.PropTypes.node,
    nestedLevel: React.PropTypes.number,
    open: React.PropTypes.bool,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,
  },

  getDefaultProps() {
    return {
      nestedLevel: 1,
      open: false,
    };
  },

  render() {

    const {
      children,
      open,
      nestedLevel,
      style,
    } = this.props;

    const styles = {
      root: {
        display: open ? null : 'none',
      },
    };

    return (
      <List style={mergeStyles(styles.root, style)}>
        {
          React.Children.map(children, (child) => {
            return React.isValidElement(child) ? (
              React.cloneElement(child, {
                nestedLevel: nestedLevel + 1,
              })
            ) : child;
          })
        }
      </List>
    );
  },

});

export default NestedList;
