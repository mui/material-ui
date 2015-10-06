const React = require('react');
const ImmutabilityHelper = require('../utils/immutability-helper');
const List = require('./list');


const NestedList = React.createClass({

  propTypes: {
    nestedLevel: React.PropTypes.number,
    open: React.PropTypes.bool,
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
      <List style={ImmutabilityHelper.merge(styles.root, style)}>
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

module.exports = NestedList;
