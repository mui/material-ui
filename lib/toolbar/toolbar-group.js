'use strict';

var React = require('react');
var Colors = require('../styles/colors');
var StylePropable = require('../mixins/style-propable');

var ToolbarGroup = React.createClass({
  displayName: 'ToolbarGroup',

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    className: React.PropTypes.string,
    float: React.PropTypes.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      float: 'left'
    };
  },

  getTheme: function getTheme() {
    return this.context.muiTheme.component.toolbar;
  },

  getSpacing: function getSpacing() {
    return this.context.muiTheme.spacing.desktopGutter;
  },

  getStyles: function getStyles() {
    var marginHorizontal = this.getSpacing();
    var marginVertical = (this.getTheme().height - this.context.muiTheme.component.button.height) / 2;
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
            onMouseOver: _this._handleMouseOverDropDownMenu,
            onMouseOut: _this._handleMouseOutDropDownMenu
          });
        case 'RaisedButton':case 'FlatButton':
          return React.cloneElement(currentChild, {
            style: _this.mergeStyles(styles.button, currentChild.props.style)
          });
        case 'FontIcon':
          return React.cloneElement(currentChild, {
            style: _this.mergeStyles(styles.icon.root, currentChild.props.style),
            onMouseOver: _this._handleMouseOverFontIcon,
            onMouseOut: _this._handleMouseOutFontIcon
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
      { className: this.props.className, style: this.mergeAndPrefix(styles.root, this.props.style) },
      newChildren
    );
  },

  _handleMouseOverDropDownMenu: function _handleMouseOverDropDownMenu(e) {
    e.target.style.zIndex = this.getStyles().icon.hover.zIndex;
    e.target.style.color = this.getStyles().icon.hover.color;
  },

  _handleMouseOutDropDownMenu: function _handleMouseOutDropDownMenu(e) {
    e.target.style.zIndex = 'auto';
    e.target.style.color = this.getStyles().icon.root.color;
  },

  _handleMouseOverFontIcon: function _handleMouseOverFontIcon(e) {
    e.target.style.zIndex = this.getStyles().icon.hover.zIndex;
    e.target.style.color = this.getStyles().icon.hover.color;
  },

  _handleMouseOutFontIcon: function _handleMouseOutFontIcon(e) {
    e.target.style.zIndex = 'auto';
    e.target.style.color = this.getStyles().icon.root.color;
  }
});

module.exports = ToolbarGroup;