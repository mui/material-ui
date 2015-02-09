var React = require('react');
var Classable = require('./mixins/classable.js');
var ClickAwayable = require('./mixins/click-awayable');
var KeyLine = require('./utils/key-line.js');
var Paper = require('./paper.jsx');
var FontIcon = require('./font-icon.jsx');
var Menu = require('./menu.jsx');
var MenuItem = require('./menu-item.jsx');

var DropDownIcon = React.createClass({

  mixins: [Classable, ClickAwayable],

  propTypes: {
    onChange: React.PropTypes.func,
    menuItems: React.PropTypes.array.isRequired
  },

  getInitialState: function() {
    return {
      open: false
    }
  },

  componentClickAway: function() {
    this.setState({ open: false });
  },

  render: function() {
    var classes = this.getClasses('mui-drop-down-icon', {
      'mui-open': this.state.open
    });

    var icon;
    if (this.props.iconClassName) icon = <FontIcon className={this.props.iconClassName} />;
   
    return (
      <div className={classes}>
          <div className="mui-menu-control" onClick={this._onControlClick}>
              {icon}
              {this.props.children}
          </div>
          <Menu ref="menuItems" menuItems={this.props.menuItems} hideable={true} visible={this.state.open} onItemClick={this._onMenuItemClick} />
        </div>
    );
  },

  _onControlClick: function(e) {
    this.setState({ open: !this.state.open });
  },

  _onMenuItemClick: function(e, key, payload) {
    if (this.props.onChange) this.props.onChange(e, key, payload);
    this.setState({ open: false });
  }

});

module.exports = DropDownIcon;
