'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var Styles = require('../styles');
var StylePropable = require('../mixins/style-propable');
var ThemeManager = require('../styles/theme-manager');
var DefaultRawTheme = require('../styles/raw-themes/light-raw-theme');

var CardMedia = React.createClass({
  displayName: 'CardMedia',

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
    overlay: React.PropTypes.node,
    style: React.PropTypes.object,
    overlayStyle: React.PropTypes.object,
    overlayContainerStyle: React.PropTypes.object,
    overlayContentStyle: React.PropTypes.object,
    mediaStyle: React.PropTypes.object,
    expandable: React.PropTypes.bool,
    actAsExpander: React.PropTypes.bool
  },

  getStyles: function getStyles() {
    return {
      root: {
        position: 'relative'
      },
      overlayContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0
      },
      overlay: {
        height: '100%',
        position: 'relative'
      },
      overlayContent: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        paddingTop: 8,
        background: Styles.Colors.lightBlack
      },
      media: {},
      mediaChild: {
        verticalAlign: 'top',
        maxWidth: '100%',
        minWidth: '100%',
        width: '100%'
      }
    };
  },

  render: function render() {
    var _this = this;

    var styles = this.getStyles();
    var rootStyle = this.prepareStyles(styles.root, this.props.style);
    var mediaStyle = this.prepareStyles(styles.media, this.props.mediaStyle);
    var overlayContainerStyle = this.prepareStyles(styles.overlayContainer, this.props.overlayContainerStyle);
    var overlayContentStyle = this.prepareStyles(styles.overlayContent, this.props.overlayContentStyle);
    var overlayStyle = this.prepareStyles(styles.overlay, this.props.overlayStyle);

    var children = React.Children.map(this.props.children, function (child) {
      return React.cloneElement(child, { style: _this.prepareStyles(styles.mediaChild, child.props.style) });
    });

    var overlayChildren = React.Children.map(this.props.overlay, function (child) {
      if (child.type.displayName === 'CardHeader' || child.type.displayName === 'CardTitle') {
        return React.cloneElement(child, {
          titleColor: Styles.Colors.darkWhite,
          subtitleColor: Styles.Colors.lightWhite
        });
      } else if (child.type.displayName === 'CardText') {
        return React.cloneElement(child, {
          color: Styles.Colors.darkWhite
        });
      } else {
        return child;
      }
    });

    return React.createElement(
      'div',
      _extends({}, this.props, { style: rootStyle }),
      React.createElement(
        'div',
        { style: mediaStyle },
        children
      ),
      this.props.overlay ? React.createElement(
        'div',
        { style: overlayContainerStyle },
        React.createElement(
          'div',
          { style: overlayStyle },
          React.createElement(
            'div',
            { style: overlayContentStyle },
            overlayChildren
          )
        )
      ) : ''
    );
  }
});

module.exports = CardMedia;