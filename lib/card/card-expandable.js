'use strict';

var React = require('react');
var Extend = require('../utils/extend');
var OpenIcon = require('../svg-icons/hardware/keyboard-arrow-up');
var CloseIcon = require('../svg-icons/hardware/keyboard-arrow-down');
var IconButton = require('../icon-button');
var StylePropable = require('../mixins/style-propable');
var DefaultRawTheme = require('../styles/raw-themes/light-raw-theme');
var ThemeManager = require('../styles/theme-manager');
var ContextPure = require('../mixins/context-pure');

var CardExpandable = React.createClass({
  displayName: 'CardExpandable',

  mixins: [StylePropable, ContextPure],

  getStyles: function getStyles() {
    var contextKeys = this.constructor.getRelevantContextKeys(this.state.muiTheme);

    var directionStyle = contextKeys.isRtl ? {
      left: 4
    } : {
      right: 4
    };

    return {
      root: Extend({
        top: 0,
        bottom: 0,
        margin: 'auto',
        position: 'absolute'
      }, directionStyle)
    };
  },

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    onExpanding: React.PropTypes.func.isRequired,
    expanded: React.PropTypes.bool,
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

  statics: {
    getRelevantContextKeys: function getRelevantContextKeys(muiTheme) {
      return {
        isRtl: muiTheme.isRtl
      };
    },
    getChildrenClasses: function getChildrenClasses() {
      return [IconButton];
    }
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

  render: function render() {
    var styles = this.getStyles();

    var expandable = undefined;
    if (this.props.expanded === true) expandable = React.createElement(OpenIcon, null);else expandable = React.createElement(CloseIcon, null);

    var mergedStyles = this.mergeStyles(styles.root, this.props.style);

    var expandableBtn = React.createElement(
      IconButton,
      {
        style: mergedStyles,
        onTouchTap: this.props.onExpanding },
      expandable
    );

    return expandableBtn;
  }
});

module.exports = CardExpandable;