'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var Styles = require('../styles');
var StylePropable = require('../mixins/style-propable');
var ThemeManager = require('../styles/theme-manager');
var DefaultRawTheme = require('../styles/raw-themes/light-raw-theme');

var CardTitle = React.createClass({
  displayName: 'CardTitle',

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

  propTypes: {
    title: React.PropTypes.node,
    titleColor: React.PropTypes.string,
    titleStyle: React.PropTypes.object,
    style: React.PropTypes.object,
    subtitle: React.PropTypes.node,
    subtitleColor: React.PropTypes.string,
    subtitleStyle: React.PropTypes.object,
    expandable: React.PropTypes.bool,
    actAsExpander: React.PropTypes.bool,
    showExpandableButton: React.PropTypes.bool
  },

  getDefaultProps: function getDefaultProps() {
    return {
      titleColor: Styles.Colors.darkBlack,
      subtitleColor: Styles.Colors.lightBlack
    };
  },

  getStyles: function getStyles() {
    return {
      root: {
        padding: 16,
        position: 'relative'
      },
      title: {
        fontSize: 24,
        color: this.props.titleColor,
        display: 'block',
        lineHeight: '36px'
      },
      subtitle: {
        fontSize: 14,
        color: this.props.subtitleColor,
        display: 'block'
      }
    };
  },

  render: function render() {
    var styles = this.getStyles();
    var rootStyle = this.prepareStyles(styles.root, this.props.style);
    var titleStyle = this.prepareStyles(styles.title, this.props.titleStyle);
    var subtitleStyle = this.prepareStyles(styles.subtitle, this.props.subtitleStyle);

    return React.createElement(
      'div',
      _extends({}, this.props, { style: rootStyle }),
      React.createElement(
        'span',
        { style: titleStyle },
        this.props.title
      ),
      React.createElement(
        'span',
        { style: subtitleStyle },
        this.props.subtitle
      ),
      this.props.children
    );
  }
});

module.exports = CardTitle;