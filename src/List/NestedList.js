import React, {Component, PropTypes} from 'react';
import List from './List';

class NestedList extends Component {
  static propTypes = {
    children: PropTypes.node,
    nestedLevel: PropTypes.number.isRequired,
    open: PropTypes.bool,
    /**
     * Override the inline-styles of the root element.
     */
    style: PropTypes.object,
  };

  static defaultProps = {
    open: false,
  };

  render() {
    const {
      children,
      open,
      nestedLevel,
      style,
    } = this.props;
    
    if (!open && !this.hasOpened) return null;
    this.hasOpened = true;

    return (
      <List style={Object.assign({}, style)}>
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
  }
}

export default NestedList;
