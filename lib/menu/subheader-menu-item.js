'use strict';

var React = require('react');
var StylePropable = require('../mixins/style-propable');
var Typography = require('../styles/typography');
var DefaultRawTheme = require('../styles/raw-themes/light-raw-theme');
var ThemeManager = require('../styles/theme-manager');

var SubheaderMenuItem = React.createClass({
  displayName: 'SubheaderMenuItem',

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    index: React.PropTypes.number.isRequired,
    text: React.PropTypes.string.isRequired,
    firstChild: React.PropTypes.bool,
    className: React.PropTypes.string,
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

  getTheme: function getTheme() {
    return this.state.muiTheme.menuSubheader;
  },

  getSpacing: function getSpacing() {
    return this.state.muiTheme.rawTheme.spacing;
  },

  getStyles: function getStyles() {
    var gutterMini = this.getSpacing().desktopGutterMini;
    var subheaderHeight = this.getSpacing().desktopSubheaderHeight;
    var styles = {
      root: {
        boxSizing: 'border-box',
        fontSize: '13px',
        letterSpacing: 0,
        fontWeight: Typography.fontWeightMedium,
        margin: 0,
        height: subheaderHeight + gutterMini,
        lineHeight: subheaderHeight + 'px',
        color: this.getTheme().textColor,
        borderTop: 'solid 1px ' + this.getTheme().borderColor,
        paddingTop: gutterMini,
        marginTop: gutterMini
      },
      rootWhenFirstChild: {
        height: subheaderHeight,
        borderTop: 'none',
        paddingTop: 0,
        marginTop: 0
      }
    };

    return styles;
  },

  render: function render() {
    return React.createElement(
      'div',
      {
        key: this.props.index,
        className: this.props.className,
        style: this.prepareStyles(this.getStyles().root, this.props.firstChild && this.getStyles().rootWhenFirstChild, this.props.style) },
      this.props.text
    );
  }

});

module.exports = SubheaderMenuItem;