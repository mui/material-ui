'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var StylePropable = require('../mixins/style-propable');
var ThemeManager = require('../styles/theme-manager');
var DefaultRawTheme = require('../styles/raw-themes/light-raw-theme');

var CardActions = React.createClass({
  displayName: 'CardActions',

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

  getStyles: function getStyles() {
    return {
      root: {
        padding: 8,
        position: 'relative'
      }
    };
  },

  propTypes: {
    expandable: React.PropTypes.bool,
    actAsExpander: React.PropTypes.bool,
    showExpandableButton: React.PropTypes.bool,
    style: React.PropTypes.object
  },

  render: function render() {
    var styles = this.getStyles();

    var children = React.Children.map(this.props.children, function (child) {
      return React.cloneElement(child, {
        style: { marginRight: 8 }
      });
    });

    return React.createElement(
      'div',
      _extends({}, this.props, { style: this.prepareStyles(styles.root, this.props.style) }),
      children
    );
  }
});

module.exports = CardActions;