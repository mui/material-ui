'use strict';

var React = require('react');
var StylePropable = require('./mixins/style-propable');
var Transitions = require('./styles/transitions');
var KeyCode = require('./utils/key-code');
var DropDownArrow = require('./svg-icons/navigation/arrow-drop-down');
var Paper = require('./paper');
var Menu = require('./menu/menu');
var ClearFix = require('./clearfix');

var DropDownMenu = React.createClass({
  displayName: 'DropDownMenu',

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  // The nested styles for drop-down-menu are modified by toolbar and possibly
  // other user components, so it will give full access to its js styles rather
  // than just the parent.
  propTypes: {
    className: React.PropTypes.string,
    displayMember: React.PropTypes.string,
    valueMember: React.PropTypes.string,
    autoWidth: React.PropTypes.bool,
    onChange: React.PropTypes.func,
    menuItems: React.PropTypes.array.isRequired,
    menuItemStyle: React.PropTypes.object,
    underlineStyle: React.PropTypes.object,
    iconStyle: React.PropTypes.object,
    labelStyle: React.PropTypes.object,
    selectedIndex: React.PropTypes.number
  },

  getDefaultProps: function getDefaultProps() {
    return {
      autoWidth: true,
      valueMember: 'payload',
      displayMember: 'text'
    };
  },

  getInitialState: function getInitialState() {
    return {
      open: false,
      isHovered: false,
      selectedIndex: this.props.hasOwnProperty('value') || this.props.hasOwnProperty('valueLink') ? null : this.props.selectedIndex || 0
    };
  },

  componentDidMount: function componentDidMount() {
    if (this.props.autoWidth) this._setWidth();
    if (this.props.hasOwnProperty('selectedIndex')) this._setSelectedIndex(this.props);
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (this.props.autoWidth) this._setWidth();
    if (nextProps.hasOwnProperty('value') || nextProps.hasOwnProperty('valueLink')) {
      return;
    } else if (nextProps.hasOwnProperty('selectedIndex')) {
      this._setSelectedIndex(nextProps);
    }
  },

  getStyles: function getStyles() {
    var zIndex = 5; // As AppBar
    var spacing = this.context.muiTheme.spacing;
    var accentColor = this.context.muiTheme.component.dropDownMenu.accentColor;
    var backgroundColor = this.context.muiTheme.component.menu.backgroundColor;
    var styles = {
      root: {
        transition: Transitions.easeOut(),
        position: 'relative',
        display: 'inline-block',
        height: spacing.desktopSubheaderHeight,
        fontSize: spacing.desktopDropDownMenuFontSize,
        outline: 'none'
      },
      control: {
        cursor: 'pointer',
        position: 'static',
        height: '100%'
      },
      controlBg: {
        transition: Transitions.easeOut(),
        backgroundColor: backgroundColor,
        height: '100%',
        width: '100%',
        opacity: 0
      },
      icon: {
        position: 'absolute',
        top: (spacing.desktopToolbarHeight - 24) / 2,
        right: spacing.desktopGutterLess,
        fill: this.context.muiTheme.component.dropDownMenu.accentColor
      },
      label: {
        transition: Transitions.easeOut(),
        lineHeight: spacing.desktopToolbarHeight + 'px',
        position: 'absolute',
        paddingLeft: spacing.desktopGutter,
        top: 0,
        opacity: 1,
        color: this.context.muiTheme.palette.textColor
      },
      underline: {
        borderTop: 'solid 1px ' + accentColor,
        margin: '-1px ' + spacing.desktopGutter + 'px'
      },
      menu: {
        zIndex: zIndex + 1
      },
      menuItem: {
        paddingRight: spacing.iconSize + spacing.desktopGutterLess + spacing.desktopGutterMini,
        height: spacing.desktopDropDownMenuItemHeight,
        lineHeight: spacing.desktopDropDownMenuItemHeight + 'px',
        whiteSpace: 'nowrap'
      },
      rootWhenOpen: {
        opacity: 1
      },
      labelWhenOpen: {
        opacity: 0,
        top: spacing.desktopToolbarHeight / 2
      },
      overlay: {
        height: '100%',
        width: '100%',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: zIndex
      }
    };

    return styles;
  },

  getInputNode: function getInputNode() {
    var root = this.refs.root;
    var item = this.props.menuItems[this.state.selectedIndex];
    if (item) {
      root.value = item[this.props.displayMember];
    }

    return root;
  },

  render: function render() {
    var _this = this;
    var styles = this.getStyles();
    var selectedIndex = this.state.selectedIndex;
    var displayValue = "";
    if (selectedIndex) {
      if (process.env.NODE_ENV !== 'production') {
        console.assert(!!this.props.menuItems[selectedIndex], 'SelectedIndex of ' + selectedIndex + ' does not exist in menuItems.');
      }
    } else {
      if (this.props.valueMember && (this.props.valueLink || this.props.value)) {
        var value = this.props.value || this.props.valueLink.value;
        for (var i = 0; i < this.props.menuItems.length; i++) {
          if (this.props.menuItems[i][this.props.valueMember] === value) {
            selectedIndex = i;
          }
        }
      }
    }

    var selectedItem = this.props.menuItems[selectedIndex];
    if (selectedItem) {
      displayValue = selectedItem[this.props.displayMember];
    }

    var menuItems = this.props.menuItems.map(function (item) {
      item.text = item[_this.props.displayMember];
      item.payload = item[_this.props.valueMember];
      return item;
    });

    return React.createElement(
      'div',
      {
        ref: 'root',
        onMouseLeave: this._handleMouseLeave,
        onMouseEnter: this._handleMouseEnter,
        onKeyDown: this._onKeyDown,
        onFocus: this.props.onFocus,
        onBlur: this.props.onBlur,
        className: this.props.className,
        style: this.mergeAndPrefix(styles.root, this.state.open && styles.rootWhenOpen, this.props.style) },
      React.createElement(
        ClearFix,
        { style: this.mergeAndPrefix(styles.control), onTouchTap: this._onControlClick },
        React.createElement(Paper, { style: this.mergeAndPrefix(styles.controlBg), zDepth: 0 }),
        React.createElement(
          'div',
          { style: this.mergeAndPrefix(styles.label, this.state.open && styles.labelWhenOpen, this.props.labelStyle) },
          displayValue
        ),
        React.createElement(DropDownArrow, { style: this.mergeAndPrefix(styles.icon, this.props.iconStyle) }),
        React.createElement('div', { style: this.mergeAndPrefix(styles.underline, this.props.underlineStyle) })
      ),
      React.createElement(Menu, {
        ref: 'menuItems',
        autoWidth: this.props.autoWidth,
        selectedIndex: selectedIndex,
        menuItems: menuItems,
        style: styles.menu,
        menuItemStyle: this.mergeAndPrefix(styles.menuItem, this.props.menuItemStyle),
        hideable: true,
        visible: this.state.open,
        onRequestClose: this._onMenuRequestClose,
        onItemTap: this._onMenuItemClick }),
      this.state.open && React.createElement('div', { style: styles.overlay, onTouchTap: this._handleOverlayTouchTap })
    );
  },

  _setWidth: function _setWidth() {
    var el = React.findDOMNode(this);
    var menuItemsDom = React.findDOMNode(this.refs.menuItems);
    if (!this.props.style || !this.props.style.hasOwnProperty('width')) {
      el.style.width = 'auto';
      el.style.width = menuItemsDom.offsetWidth + 'px';
    }
  },

  _setSelectedIndex: function _setSelectedIndex(props) {
    var selectedIndex = props.selectedIndex;

    if (process.env.NODE_ENV !== 'production' && selectedIndex < 0) {
      console.warn('Cannot set selectedIndex to a negative index.', selectedIndex);
    }

    this.setState({ selectedIndex: selectedIndex > -1 ? selectedIndex : 0 });
  },

  _onControlClick: function _onControlClick() {
    this.setState({ open: !this.state.open });
  },

  _onKeyDown: function _onKeyDown(e) {
    switch (e.which) {
      case KeyCode.UP:
        if (!this.state.open) {
          this._selectPreviousItem();
        } else {
          if (e.altKey) {
            this.setState({ open: false });
          }
        }
        break;
      case KeyCode.DOWN:
        if (!this.state.open) {
          if (e.altKey) {
            this.setState({ open: true });
          } else {
            this._selectNextItem();
          }
        }
        break;
      case KeyCode.ENTER:
      case KeyCode.SPACE:
        this.setState({ open: true });
        break;
      default:
        return; //important
    }
    e.preventDefault();
  },

  _onMenuItemClick: function _onMenuItemClick(e, key, payload) {
    if (this.props.onChange && this.state.selectedIndex !== key) {
      var selectedItem = this.props.menuItems[key];
      if (selectedItem) {
        e.target.value = selectedItem[this.props.valueMember];
      }

      if (this.props.valueLink) {
        this.props.valueLink.requestChange(e.target.value);
      } else {
        this.props.onChange(e, key, payload);
      }
    }

    this.setState({
      selectedIndex: key,
      value: e.target.value,
      open: false,
      isHovered: false
    });
  },

  _onMenuRequestClose: function _onMenuRequestClose() {
    this.setState({ open: false });
  },

  _handleMouseEnter: function _handleMouseEnter() {
    this.setState({ isHovered: true });
  },

  _handleMouseLeave: function _handleMouseLeave() {
    this.setState({ isHovered: false });
  },

  _selectPreviousItem: function _selectPreviousItem() {
    this.setState({ selectedIndex: Math.max(this.state.selectedIndex - 1, 0) });
  },

  _selectNextItem: function _selectNextItem() {
    this.setState({ selectedIndex: Math.min(this.state.selectedIndex + 1, this.props.menuItems.length - 1) });
  },

  _handleOverlayTouchTap: function _handleOverlayTouchTap() {
    this.setState({
      open: false
    });
  }

});

module.exports = DropDownMenu;