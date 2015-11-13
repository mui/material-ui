'use strict';

var React = require('react');
var Colors = require('../styles/colors');
var StylePropable = require('../mixins/style-propable');
var DefaultRawTheme = require('../styles/raw-themes/light-raw-theme');
var ThemeManager = require('../styles/theme-manager');

var ToolbarGroup = React.createClass({
  displayName: 'ToolbarGroup',

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    className: React.PropTypes.string,
    float: React.PropTypes.string,
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

  getDefaultProps: function getDefaultProps() {
    return {
      float: 'left'
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
    return this.state.muiTheme.rawTheme.spacing.desktopGutter;
  },

  getStyles: function getStyles() {
    var marginHorizontal = this.getSpacing();
    var marginVertical = (this.getTheme().height - this.state.muiTheme.button.height) / 2;
    var styles = {
      root: {
        position: 'relative',
        float: this.props.float
      },
      dropDownMenu: {
        root: {
          float: 'left',
          color: Colors.lightBlack, // removes hover color change, we want to keep it
          display: 'inline-block',
          marginRight: this.getSpacing()
        },
        controlBg: {
          backgroundColor: this.getTheme().menuHoverColor,
          borderRadius: 0
        },
        underline: {
          display: 'none'
        }
      },
      button: {
        float: 'left',
        margin: marginVertical + 'px ' + marginHorizontal + 'px',
        position: 'relative'
      },
      icon: {
        root: {
          float: 'left',
          cursor: 'pointer',
          color: this.getTheme().iconColor,
          lineHeight: this.getTheme().height + 'px',
          paddingLeft: this.getSpacing()
        },
        hover: {
          color: Colors.darkBlack
        }
      },
      span: {
        float: 'left',
        color: this.getTheme().iconColor,
        lineHeight: this.getTheme().height + 'px'
      }
    };

    return styles;
  },

  render: function render() {
    var _this = this;

    var styles = this.getStyles();

    if (this.props.firstChild) styles.marginLeft = -24;
    if (this.props.lastChild) styles.marginRight = -24;

    var newChildren = React.Children.map(this.props.children, function (currentChild) {
      if (!currentChild) {
        return null;
      }
      if (!currentChild.type) {
        return currentChild;
      }
      switch (currentChild.type.displayName) {
        case 'DropDownMenu':
          return React.cloneElement(currentChild, {
            style: _this.mergeStyles(styles.dropDownMenu.root, currentChild.props.style),
            styleControlBg: styles.dropDownMenu.controlBg,
            styleUnderline: styles.dropDownMenu.underline
          });
        case 'DropDownIcon':
          return React.cloneElement(currentChild, {
            style: _this.mergeStyles({ float: 'left' }, currentChild.props.style),
            iconStyle: styles.icon.root,
            onMouseEnter: _this._handleMouseEnterDropDownMenu,
            onMouseLeave: _this._handleMouseLeaveDropDownMenu
          });
        case 'RaisedButton':case 'FlatButton':
          return React.cloneElement(currentChild, {
            style: _this.mergeStyles(styles.button, currentChild.props.style)
          });
        case 'FontIcon':
          return React.cloneElement(currentChild, {
            style: _this.mergeStyles(styles.icon.root, currentChild.props.style),
            onMouseEnter: _this._handleMouseEnterFontIcon,
            onMouseLeave: _this._handleMouseLeaveFontIcon
          });
        case 'ToolbarSeparator':case 'ToolbarTitle':
          return React.cloneElement(currentChild, {
            style: _this.mergeStyles(styles.span, currentChild.props.style)
          });
        default:
          return currentChild;
      }
    }, this);

    return React.createElement(
      'div',
      { className: this.props.className, style: this.prepareStyles(styles.root, this.props.style) },
      newChildren
    );
  },

  _handleMouseEnterDropDownMenu: function _handleMouseEnterDropDownMenu(e) {
    e.target.style.zIndex = this.getStyles().icon.hover.zIndex;
    e.target.style.color = this.getStyles().icon.hover.color;
  },

  _handleMouseLeaveDropDownMenu: function _handleMouseLeaveDropDownMenu(e) {
    e.target.style.zIndex = 'auto';
    e.target.style.color = this.getStyles().icon.root.color;
  },

  _handleMouseEnterFontIcon: function _handleMouseEnterFontIcon(e) {
    e.target.style.zIndex = this.getStyles().icon.hover.zIndex;
    e.target.style.color = this.getStyles().icon.hover.color;
  },

  _handleMouseLeaveFontIcon: function _handleMouseLeaveFontIcon(e) {
    e.target.style.zIndex = 'auto';
    e.target.style.color = this.getStyles().icon.root.color;
  }
});

module.exports = ToolbarGroup;