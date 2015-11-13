'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react');
var ReactDOM = require('react-dom');
var TabTemplate = require('./tabTemplate');
var InkBar = require('../ink-bar');
var StylePropable = require('../mixins/style-propable');
var Controllable = require('../mixins/controllable');
var DefaultRawTheme = require('../styles/raw-themes/light-raw-theme');
var ThemeManager = require('../styles/theme-manager');

var Tabs = React.createClass({
  displayName: 'Tabs',

  mixins: [StylePropable, Controllable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    contentContainerStyle: React.PropTypes.object,
    initialSelectedIndex: React.PropTypes.number,
    inkBarStyle: React.PropTypes.object,
    tabItemContainerStyle: React.PropTypes.object,
    tabTemplate: React.PropTypes.func,
    style: React.PropTypes.object
  },

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext: function getChildContext() {
    return {
      muiTheme: this.state.muiTheme
    };
  },

  getDefaultProps: function getDefaultProps() {
    return {
      initialSelectedIndex: 0,
      tabTemplate: TabTemplate
    };
  },

  getInitialState: function getInitialState() {
    var valueLink = this.getValueLink(this.props);
    var initialIndex = this.props.initialSelectedIndex;

    return {
      selectedIndex: valueLink.value ? this._getSelectedIndex(this.props) : initialIndex < this.getTabCount() ? initialIndex : 0,
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme)
    };
  },

  getEvenWidth: function getEvenWidth() {
    return parseInt(window.getComputedStyle(ReactDOM.findDOMNode(this)).getPropertyValue('width'), 10);
  },

  getTabCount: function getTabCount() {
    return React.Children.count(this.props.children);
  },

  componentWillReceiveProps: function componentWillReceiveProps(newProps, nextContext) {
    var valueLink = this.getValueLink(newProps);
    var newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;

    if (valueLink.value) {
      this.setState({ selectedIndex: this._getSelectedIndex(newProps) });
    }

    this.setState({ muiTheme: newMuiTheme });
  },

  render: function render() {
    var _this = this;

    var _props = this.props;
    var children = _props.children;
    var contentContainerStyle = _props.contentContainerStyle;
    var initialSelectedIndex = _props.initialSelectedIndex;
    var inkBarStyle = _props.inkBarStyle;
    var style = _props.style;
    var tabWidth = _props.tabWidth;
    var tabItemContainerStyle = _props.tabItemContainerStyle;
    var tabTemplate = _props.tabTemplate;

    var other = _objectWithoutProperties(_props, ['children', 'contentContainerStyle', 'initialSelectedIndex', 'inkBarStyle', 'style', 'tabWidth', 'tabItemContainerStyle', 'tabTemplate']);

    var themeVariables = this.state.muiTheme.tabs;
    var styles = {
      tabItemContainer: {
        margin: 0,
        padding: 0,
        width: '100%',
        height: 48,
        backgroundColor: themeVariables.backgroundColor,
        whiteSpace: 'nowrap',
        display: 'table'
      }
    };

    var valueLink = this.getValueLink(this.props);
    var tabValue = valueLink.value;
    var tabContent = [];

    var width = 100 / this.getTabCount() + '%';

    var left = 'calc(' + width + '*' + this.state.selectedIndex + ')';

    var tabs = React.Children.map(children, function (tab, index) {
      if (tab.type.displayName === "Tab") {
        if (!tab.props.value && tabValue && process.env.NODE_ENV !== 'production') {
          console.error('Tabs value prop has been passed, but Tab ' + index + ' does not have a value prop. Needs value if Tabs is going' + ' to be a controlled component.');
        }

        tabContent.push(tab.props.children ? React.createElement(tabTemplate, {
          key: index,
          selected: _this._getSelected(tab, index)
        }, tab.props.children) : undefined);

        return React.cloneElement(tab, {
          key: index,
          selected: _this._getSelected(tab, index),
          tabIndex: index,
          width: width,
          onTouchTap: _this._handleTabTouchTap
        });
      } else {
        var type = tab.type.displayName || tab.type;
        console.error('Tabs only accepts Tab Components as children. Found ' + type + ' as child number ' + (index + 1) + ' of Tabs');
      }
    }, this);

    var inkBar = this.state.selectedIndex !== -1 ? React.createElement(InkBar, {
      left: left,
      width: width,
      style: inkBarStyle }) : null;

    var inkBarContainerWidth = tabItemContainerStyle ? tabItemContainerStyle.width : '100%';

    return React.createElement(
      'div',
      _extends({}, other, {
        style: this.prepareStyles(style) }),
      React.createElement(
        'div',
        { style: this.prepareStyles(styles.tabItemContainer, tabItemContainerStyle) },
        tabs
      ),
      React.createElement(
        'div',
        { style: { width: inkBarContainerWidth } },
        inkBar
      ),
      React.createElement(
        'div',
        { style: this.prepareStyles(contentContainerStyle) },
        tabContent
      )
    );
  },

  _getSelectedIndex: function _getSelectedIndex(props) {
    var valueLink = this.getValueLink(props);
    var selectedIndex = -1;

    React.Children.forEach(props.children, function (tab, index) {
      if (valueLink.value === tab.props.value) {
        selectedIndex = index;
      }
    });

    return selectedIndex;
  },

  _handleTabTouchTap: function _handleTabTouchTap(value, e, tab) {
    var valueLink = this.getValueLink(this.props);
    var tabIndex = tab.props.tabIndex;

    if (valueLink.value && valueLink.value !== value || this.state.selectedIndex !== tabIndex) {
      valueLink.requestChange(value, e, tab);
    }

    this.setState({ selectedIndex: tabIndex });
    tab.props.onActive(tab);
  },

  _getSelected: function _getSelected(tab, index) {
    var valueLink = this.getValueLink(this.props);
    return valueLink.value ? valueLink.value === tab.props.value : this.state.selectedIndex === index;
  }

});

module.exports = Tabs;