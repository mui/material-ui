let React = require('react');
let List = require('./list');


let ListNested = React.createClass({

  propTypes: {
    nestedLevel: React.PropTypes.number,
    open: React.PropTypes.bool,
  },

  getDefaultProps() {
    return {
      nestedLevel: 1,
      open: false,
    };
  },

  render() {
    let nestedLevel = this.props.nestedLevel;
    let style = {
      nestedList: {},
    };

    if (!this.props.open) {
      style.nestedList.display = 'none';
    }

    return (
      <List style={style.nestedList}>
        {
          React.Children.map(this.props.children, (child) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child, {nestedLevel: nestedLevel + 1});
            }
            return child;
          })
        }
      </List>
    );
  },

});

module.exports = ListNested;
