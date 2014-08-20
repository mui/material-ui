/**
 * @jsx React.DOM
 */
 
var $ = require('jquery'),
  React = require('react'),
  Classable = require('./mixins/classable.js'),
  ClickAwayable = require('./mixins/click-awayable'),
  Paper = require('./paper.jsx'),
  Icon = require('./icon.jsx'),
  Menu = require('./menu.jsx');

var DropDownMenu = React.createClass({

	mixins: [Classable, ClickAwayable],

  propTypes: {
    onChange: React.PropTypes.func,
    items: React.PropTypes.array.isRequired
  },

  getInitialState: function() {
  	return {
      open: false,
      selectedIndex: 0
  	}
  },

  componentDidMount: function() {
    var _this = this;

    this.listenToClickAway(this, function() {
      _this.setState({
        open: false
      });
    });

    this._setWidth();
  },

  componentWillUnmount: function() {
    this.stopListeningToClickAway(this);
  },

  componentDidUpdate: function() {
    this._setWidth();
  },

  render: function() {
    var classes = this.getClasses('mui-drop-down-menu');

    return (
    	<div className={classes}>
        <div className="mui-menu-control" onClick={this._onControlClick}>
          <Paper className="mui-menu-control-bg" />
          <div className="mui-menu-label">
            {this.props.items[this.state.selectedIndex].text}
          </div>
          <Icon icon="arrow-drop-down" />
        </div>
        <Menu ref="menuItems" selectedIndex={this.state.selectedIndex} items={this.props.items} visible={this.state.open} onItemClick={this._onMenuItemClick} />
      </div>
    );
  },

  _setWidth: function() {
    var $el = $(this.getDOMNode()),
      $menuItems = $(this.refs.menuItems.getDOMNode());

    $el.css('width', $menuItems.width());
  },

  _onControlClick: function(e) {
    this.setState({ open: !this.state.open });
  },

  _onMenuItemClick: function(e, key, payload) {
    if (this.props.onChange && this.state.selectedIndex !== key) this.props.onChange(e, key, payload);
    this.setState({ 
      selectedIndex: key,
      open: false
    });
  }

});

module.exports = DropDownMenu;
