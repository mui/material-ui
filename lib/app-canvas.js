'use strict';

var React = require('react');
var StylePropable = require('./mixins/style-propable');
var DefaultRawTheme = require('./styles/raw-themes/light-raw-theme');
var ThemeManager = require('./styles/theme-manager');

var AppCanvas = React.createClass({
  displayName: 'AppCanvas',

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

  render: function render() {
    var _this = this;

    var styles = {
      height: '100%',
      backgroundColor: this.state.muiTheme.rawTheme.palette.canvasColor,
      WebkitFontSmoothing: 'antialiased',
      direction: 'ltr'
    };

    var newChildren = React.Children.map(this.props.children, function (currentChild) {
      if (!currentChild) {
        // If undefined, skip it
        return null;
      }

      switch (currentChild.type.displayName) {
        case 'AppBar':
          return React.cloneElement(currentChild, {
            style: _this.mergeStyles(currentChild.props.style, {
              position: 'fixed'
            })
          });
        default:
          return currentChild;
      }
    }, this);

    return React.createElement(
      'div',
      { style: this.prepareStyles(styles) },
      newChildren
    );
  }

});

module.exports = AppCanvas;