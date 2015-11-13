'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var React = require('react');
var Typography = require('./styles/typography');
var DefaultRawTheme = require('./styles/raw-themes/light-raw-theme');
var ThemeManager = require('./styles/theme-manager');
var StylePropable = require('./mixins/style-propable');

// Badge
exports['default'] = React.createClass({
  displayName: 'Badge',
  mixins: [StylePropable],
  contextTypes: {
    muiTheme: React.PropTypes.object
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
  propTypes: {
    className: React.PropTypes.string,
    badgeContent: React.PropTypes.node.isRequired,
    primary: React.PropTypes.bool,
    secondary: React.PropTypes.bool,
    style: React.PropTypes.object,
    badgeStyle: React.PropTypes.object
  },
  getInitialState: function getInitialState() {
    return {
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme)
    };
  },
  getDefaultProps: function getDefaultProps() {
    return {
      className: '',
      primary: false,
      secondary: false,
      style: {},
      badgeStyle: {}
    };
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps, nextContext) {
    var newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({
      muiTheme: newMuiTheme
    });
  },
  getStyles: function getStyles() {
    var theme = this.state.muiTheme.badge;

    var badgeBackgroundColor = this.props.primary ? theme.primaryColor : this.props.secondary ? theme.secondaryColor : theme.color;

    var badgeTextColor = this.props.primary ? theme.primaryTextColor : this.props.secondary ? theme.secondaryTextColor : theme.textColor;

    var radius = 12;
    var radius2x = Math.floor(2 * radius);

    return {
      root: {
        position: 'relative',
        display: 'inline-block',
        padding: [radius2x + 'px', radius2x + 'px', radius + 'px', radius + 'px'].join(' ')
      },
      badge: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        right: 0,
        fontWeight: Typography.fontWeightMedium,
        fontSize: radius,
        width: radius2x,
        height: radius2x,
        borderRadius: '50%',
        backgroundColor: badgeBackgroundColor,
        color: badgeTextColor
      }
    };
  },
  render: function render() {
    var styles = this.getStyles();
    return React.createElement(
      'div',
      { style: this.prepareStyles(styles.root, this.props.style), className: this.props.className },
      this.props.children,
      React.createElement(
        'span',
        { style: this.prepareStyles(styles.badge, this.props.badgeStyle) },
        this.props.badgeContent
      )
    );
  }
});
module.exports = exports['default'];