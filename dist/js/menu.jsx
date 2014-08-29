/**
 * @jsx React.DOM
 */

var $ = require('jquery'),
  React = require('react'),
  Constants = require('./utils/constants.js'),
	Classable = require('./mixins/classable.js'),
  ClickAwayable = require('./mixins/click-awayable'),
  KeyLine = require('./utils/key-line.js'),
  Paper = require('./paper.jsx'),
  Icon = require('./icon.jsx'),
  Menu = require('./menu.jsx'),
  MenuItem = require('./menu-item.jsx');

var Menu = React.createClass({

	mixins: [Classable, ClickAwayable],

	propTypes: {
    onNestedItemClick: React.PropTypes.func,
    onItemClick: React.PropTypes.func,
    onToggleClick: React.PropTypes.func,
    menuItems: React.PropTypes.array.isRequired,
    selectedIndex: React.PropTypes.number,
    visible: React.PropTypes.bool,
    setHeightWidth: React.PropTypes.bool,
    nested: React.PropTypes.bool,
    zDepth: React.PropTypes.number
  },

  getInitialState: function() {
    return {
      open: false
    }
  },

  getDefaultProps: function() {
    return { 
      visible: true,
      setHeightWidth: false,
      nested: false
    };
  },
  
  componentDidMount: function() {
    this._setHeightAndWidth();

    var _this = this;

    if(this.props.nested === true) {
      this.listenToClickAway(this, function() {
        _this.setState({
          open: false
        });

      var $el = $(_this.refs.nestedMenu.getDOMNode());

      $el
      .css({
        "height": 0,
        "opacity": 0,
        "z-index": -2
      });

      });
    }
  },

  componentDidUpdate: function() {
    this._setHeightAndWidth();
  },

	render: function() {
    var classes = this.getClasses('mui-menu');

    return (
			<Paper zDepth={this.props.zDepth} className={classes}>
        {this._getChildren()}
      </Paper>
		);
	},
  
  _getChildren: function() {
    var children = [],
      menuItem,
      itemComponent,
      isSelected;

    for (var i=0; i < this.props.menuItems.length; i++) {
      menuItem = this.props.menuItems[i];
      isSelected = i === this.props.selectedIndex;

      switch (menuItem.type) {

        case Constants.MenuItemTypes.SUBHEADER:
          itemComponent = (
            <div key={i} className="mui-subheader">{menuItem.text}</div>
          );
          break;

        case Constants.MenuItemTypes.NESTED:
          var testRef = "testRef";
          itemComponent = (
            <div ref={testRef} key={i} className="mui-nested">
              <span onClick={this._onNestedItemClick}>
              {menuItem.text}
              </span>
              <Icon className="mui-nested-arrow" icon="chevron-right" />
              <Menu ref="nestedMenu" className="mui-menu-nested" menuItems={menuItem.items} visible={this.state.open} onItemClick={this._onItemClick} zDepth={1} />
            </div>
            /*
            <MenuNestedItem />
            */
          );
          break;

        default:
          itemComponent = (
            <MenuItem selected={isSelected} key={i} icon={menuItem.icon} number={menuItem.number} toggle={menuItem.toggle} onClick={this._onItemClick} onToggle={this._onItemToggle}>{menuItem.text}</MenuItem>
          );
      }
      children.push(itemComponent);
    }

    return children;
  },

  _setHeightAndWidth: function() {
    if(this.props.setHeightWidth) {
      var $el = $(this.getDOMNode()),
        menuHeight = (Constants.KeyLines.Desktop.MENU_ITEM_HEIGHT * this.props.menuItems.length) + (Constants.KeyLines.Desktop.GUTTER_LESS * 2),
        menuWidth = $el.width();

      //Make sure the width is an increment of the keylines
      menuWidth = KeyLine.getIncrementalDim(menuWidth);
      $el
        .css({
          width: menuWidth,
          height: this.props.visible ? menuHeight : 0
        });
    }
  },

  expandNestedMenu: function(e, key, theRef) {
    //console.log(theRef);
    var $el = $(theRef.getDOMNode());
    //console.log($el);


    console.log(this.state.open);

    $el
    .css({
      "height": this.state.open ? 0 : 300,
      "opacity": this.state.open ? 0 : 1,
      "z-index": this.state.open ? -2 : 1
    });
  },

  _onNestedItemClick: function(e, key) {
      this.setState({ open: !this.state.open });
      var theRef = this.refs['nestedMenu'];
      this.expandNestedMenu(e, key, theRef);
  },

  _onItemClick: function(e, key) {
    if (this.props.onItemClick) this.props.onItemClick(e, key, this.props.menuItems[key]);
  },

  _onItemToggle: function(e, key, toggled) {
    if (this.props.onItemToggle) this.props.onItemToggle(e, key, this.props.menuItems[key], toggled);
      console.log('Menu Toggle: ', key, toggled);
  }

});

module.exports = Menu;