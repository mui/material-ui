const React = require('react');
const ImmutabilityHelper = require('../utils/immutability-helper');
const List = require('./list');


class NestedList extends React.Component {
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
  }
}

NestedList.defaultProps = {
  nestedLevel: 1,
  open: false,
};

NestedList.propTypes = {
  nestedLevel: React.PropTypes.number,
  open: React.PropTypes.bool,
};

module.exports = NestedList;
