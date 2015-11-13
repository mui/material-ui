'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react');
var StylePropable = require('../mixins/style-propable');
var EnhancedButton = require('../enhanced-button');
var Transitions = require('../styles/transitions');
var DefaultRawTheme = require('../styles/raw-themes/light-raw-theme');
var ThemeManager = require('../styles/theme-manager');

var ClockButton = React.createClass({
  displayName: 'ClockButton',

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    position: React.PropTypes.oneOf(['left', 'right'])
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

  getInitialState: function getInitialState() {
    return {
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme)
    };
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps: function componentWillReceiveProps(nextProps, nextContext) {
    var newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({ muiTheme: newMuiTheme });
  },

  getDefaultProps: function getDefaultProps() {
    return {
      position: "left"
    };
  },

  _handleTouchTap: function _handleTouchTap() {
    this.setState({
      selected: true
    });
    this.props.onTouchTap();
  },

  getTheme: function getTheme() {
    return this.state.muiTheme.timePicker;
  },

  render: function render() {
    var _props = this.props;
    var className = _props.className;

    var other = _objectWithoutProperties(_props, ['className']);

    var styles = {
      root: {
        position: "absolute",
        bottom: 65,
        pointerEvents: "auto",
        height: 50,
        width: 50,
        borderRadius: "100%"
      },

      label: {
        position: "absolute",
        top: 17,
        left: 14
      },

      select: {
        position: 'absolute',
        height: 50,
        width: 50,
        top: 0,
        left: 0,
        opacity: 0,
        borderRadius: '50%',
        transform: 'scale(0)',
        transition: Transitions.easeOut(),
        backgroundColor: this.getTheme().accentColor
      }
    };

    if (this.props.selected) {
      styles.label.color = this.getTheme().selectTextColor;
      styles.select.opacity = 1;
      styles.select.transform = 'scale(1)';
    }

    if (this.props.position === "right") {
      styles.root.right = "5px";
    } else {
      styles.root.left = "5px";
    }

    return React.createElement(
      EnhancedButton,
      _extends({}, other, {
        style: this.mergeStyles(styles.root),
        disableFocusRipple: true,
        disableTouchRipple: true,
        onTouchTap: this._handleTouchTap }),
      React.createElement('span', { style: this.prepareStyles(styles.select) }),
      React.createElement(
        'span',
        { style: this.prepareStyles(styles.label) },
        this.props.children
      )
    );
  }
});

module.exports = ClockButton;