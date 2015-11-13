'use strict';

var React = require('react');
var StylePropable = require('../mixins/style-propable');
var DefaultRawTheme = require('../styles/raw-themes/light-raw-theme');
var ThemeManager = require('../styles/theme-manager');

var ToolbarSeparator = React.createClass({
  displayName: 'ToolbarSeparator',

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
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
    return this.state.muiTheme.toolbar;
  },

  getSpacing: function getSpacing() {
    return this.state.muiTheme.rawTheme.spacing;
  },

  render: function render() {
    var styles = this.prepareStyles({
      backgroundColor: this.getTheme().separatorColor,
      display: 'inline-block',
      height: this.getSpacing().desktopGutterMore,
      marginLeft: this.getSpacing().desktopGutter,
      position: 'relative',
      top: (this.getTheme().height - this.getSpacing().desktopGutterMore) / 2,
      width: 1
    }, this.props.style);

    return React.createElement('span', { className: this.props.className, style: styles });
  }

});

module.exports = ToolbarSeparator;