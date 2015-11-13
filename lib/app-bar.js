'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react');
var StylePropable = require('./mixins/style-propable');
var Typography = require('./styles/typography');
var IconButton = require('./icon-button');
var NavigationMenu = require('./svg-icons/navigation/menu');
var DefaultRawTheme = require('./styles/raw-themes/light-raw-theme');
var ThemeManager = require('./styles/theme-manager');
var Paper = require('./paper');
var PropTypes = require('./utils/prop-types');

var AppBar = React.createClass({
  displayName: 'AppBar',

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
    onLeftIconButtonTouchTap: React.PropTypes.func,
    onRightIconButtonTouchTap: React.PropTypes.func,
    onTitleTouchTap: React.PropTypes.func,
    showMenuIconButton: React.PropTypes.bool,
    style: React.PropTypes.object,
    iconClassNameLeft: React.PropTypes.string,
    iconClassNameRight: React.PropTypes.string,
    iconElementLeft: React.PropTypes.element,
    iconElementRight: React.PropTypes.element,
    iconStyleRight: React.PropTypes.object,
    title: React.PropTypes.node,
    zDepth: PropTypes.zDepth
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
      showMenuIconButton: true,
      title: '',
      zDepth: 1
    };
  },

  componentDidMount: function componentDidMount() {
    if (process.env.NODE_ENV !== 'production') {
      if (this.props.iconElementLeft && this.props.iconClassNameLeft) {
        console.warn('Properties iconClassNameLeft and iconElementLeft cannot be simultaneously ' + 'defined. Please use one or the other.');
      }

      if (this.props.iconElementRight && this.props.iconClassNameRight) {
        console.warn('Properties iconClassNameRight and iconElementRight cannot be simultaneously ' + 'defined. Please use one or the other.');
      }
    }
  },

  getStyles: function getStyles() {
    var spacing = this.state.muiTheme.rawTheme.spacing;
    var themeVariables = this.state.muiTheme.appBar;
    var iconButtonSize = this.state.muiTheme.button.iconButtonSize;
    var flatButtonSize = 36;
    var styles = {
      root: {
        position: 'relative',
        zIndex: 5,
        width: '100%',
        display: '-webkit-box; display: -webkit-flex; display: flex',
        minHeight: themeVariables.height,
        backgroundColor: themeVariables.color,
        paddingLeft: spacing.desktopGutter,
        paddingRight: spacing.desktopGutter
      },
      title: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        margin: 0,
        paddingTop: 0,
        letterSpacing: 0,
        fontSize: 24,
        fontWeight: Typography.fontWeightNormal,
        color: themeVariables.textColor,
        lineHeight: themeVariables.height + 'px'
      },
      mainElement: {
        boxFlex: 1,
        flex: '1'
      },
      iconButton: {
        style: {
          marginTop: (themeVariables.height - iconButtonSize) / 2,
          marginRight: 8,
          marginLeft: -16
        },
        iconStyle: {
          fill: themeVariables.textColor,
          color: themeVariables.textColor
        }
      },
      flatButton: {
        color: themeVariables.textColor,
        backgroundColor: 'transparent',
        marginTop: (iconButtonSize - flatButtonSize) / 2 + 2
      }
    };

    return styles;
  },

  render: function render() {
    var _props = this.props;
    var title = _props.title;
    var iconStyleRight = _props.iconStyleRight;
    var showMenuIconButton = _props.showMenuIconButton;
    var iconElementLeft = _props.iconElementLeft;
    var iconElementRight = _props.iconElementRight;
    var iconClassNameLeft = _props.iconClassNameLeft;
    var iconClassNameRight = _props.iconClassNameRight;
    var className = _props.className;
    var style = _props.style;
    var zDepth = _props.zDepth;
    var children = _props.children;

    var other = _objectWithoutProperties(_props, ['title', 'iconStyleRight', 'showMenuIconButton', 'iconElementLeft', 'iconElementRight', 'iconClassNameLeft', 'iconClassNameRight', 'className', 'style', 'zDepth', 'children']);

    var menuElementLeft = undefined;
    var menuElementRight = undefined;
    var styles = this.getStyles();
    var iconRightStyle = this.mergeStyles(styles.iconButton.style, {
      marginRight: -16,
      marginLeft: 'auto'
    }, iconStyleRight);
    var titleElement = undefined;

    if (title) {
      // If the title is a string, wrap in an h1 tag.
      // If not, just use it as a node.
      titleElement = typeof title === 'string' || title instanceof String ? React.createElement(
        'h1',
        { onTouchTap: this._onTitleTouchTap, style: this.prepareStyles(styles.title, styles.mainElement) },
        title
      ) : React.createElement(
        'div',
        { onTouchTap: this._onTitleTouchTap, style: this.prepareStyles(styles.title, styles.mainElement) },
        title
      );
    }

    if (showMenuIconButton) {
      if (iconElementLeft) {
        switch (iconElementLeft.type.displayName) {
          case 'IconButton':
            iconElementLeft = React.cloneElement(iconElementLeft, {
              iconStyle: this.mergeStyles(styles.iconButton.iconStyle)
            });
            break;
        }

        menuElementLeft = React.createElement(
          'div',
          { style: this.prepareStyles(styles.iconButton.style) },
          iconElementLeft
        );
      } else {
        var child = iconClassNameLeft ? '' : React.createElement(NavigationMenu, { style: this.mergeStyles(styles.iconButton.iconStyle) });
        menuElementLeft = React.createElement(
          IconButton,
          {
            style: this.mergeStyles(styles.iconButton.style),
            iconStyle: this.mergeStyles(styles.iconButton.iconStyle),
            iconClassName: iconClassNameLeft,
            onTouchTap: this._onLeftIconButtonTouchTap },
          child
        );
      }
    }

    if (iconElementRight) {
      switch (iconElementRight.type.displayName) {
        case 'IconMenu':
        case 'IconButton':
          iconElementRight = React.cloneElement(iconElementRight, {
            iconStyle: this.mergeStyles(styles.iconButton.iconStyle)
          });
          break;

        case 'FlatButton':
          iconElementRight = React.cloneElement(iconElementRight, {
            style: this.mergeStyles(styles.flatButton, iconElementRight.props.style)
          });
          break;
      }

      menuElementRight = React.createElement(
        'div',
        { style: this.prepareStyles(iconRightStyle) },
        iconElementRight
      );
    } else if (iconClassNameRight) {
      menuElementRight = React.createElement(IconButton, {
        style: iconRightStyle,
        iconStyle: this.mergeStyles(styles.iconButton.iconStyle),
        iconClassName: iconClassNameRight,
        onTouchTap: this._onRightIconButtonTouchTap });
    }

    return React.createElement(
      Paper,
      _extends({}, other, {
        rounded: false,
        className: className,
        style: this.mergeStyles(styles.root, style),
        zDepth: zDepth }),
      menuElementLeft,
      titleElement,
      menuElementRight,
      children
    );
  },

  _onLeftIconButtonTouchTap: function _onLeftIconButtonTouchTap(event) {
    if (this.props.onLeftIconButtonTouchTap) {
      this.props.onLeftIconButtonTouchTap(event);
    }
  },

  _onRightIconButtonTouchTap: function _onRightIconButtonTouchTap(event) {
    if (this.props.onRightIconButtonTouchTap) {
      this.props.onRightIconButtonTouchTap(event);
    }
  },

  _onTitleTouchTap: function _onTitleTouchTap(event) {
    if (this.props.onTitleTouchTap) {
      this.props.onTitleTouchTap(event);
    }
  }

});

module.exports = AppBar;