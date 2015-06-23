let React = require('react');
let List = require('./list');
let ListItem = require('./list-item');


let ListItemNested = React.createClass({

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    nestedLevel: React.PropTypes.number
  },

  getDefaultProps() {
    return {
      nestedLevel: 1
    }
  },

  getInitialState() {
    return {
      open: false
    };
  },

  render() {
    let nestedLevel = this.props.nestedLevel;
    let [parent, ...children] = this.props.children;
    let style = {
      parentChild: {
        marginLeft: (nestedLevel - 1) * 36,
        position: 'relative'
      },
      nestedList: {},
      nestedListChildren: {
        marginLeft: nestedLevel * 36,
        position: 'relative'
      }
    };

    if (!this.state.open) {
      style.nestedList.display = 'none';
    }

    return (
      <div>
        {React.cloneElement(parent, {onTouchTap: this._toggleNestedList, innerStyle: style.parentChild})}
        <List style={style.nestedList}>
          {
            React.Children.map(children, function(child) {
              if (child.type.displayName === 'ListItemNested') {
                return React.cloneElement(child, {nestedLevel: ++nestedLevel});
              }
              else {
                return React.cloneElement(child, {innerStyle: style.nestedListChildren});
              }
            })
          }
        </List>
      </div>
    );
  },

  _toggleNestedList() {
    this.setState({open: !this.state.open});
  }

});

module.exports = ListItemNested;
